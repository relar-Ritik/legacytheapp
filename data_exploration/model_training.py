import numpy as np
import torch
from datasets import Dataset
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    DataCollatorWithPadding, TrainingArguments, Trainer
)
import evaluate

# ------------------------------------------------------------

from datasets import Dataset, ClassLabel, load_dataset


dataset = load_dataset("nbertagnolli/counsel-chat", cache_dir=".")
df = dataset["train"].to_pandas()
df_clean = df.dropna(subset=["questionText"])

texts  = df_clean["questionText"].tolist()
labels = df_clean["topic"].tolist()

# map topics → ids
label2id = {t:i for i,t in enumerate(sorted(set(labels)))}
id2label = {v:k for k,v in label2id.items()}
y = [label2id[t] for t in labels]

raw_ds = Dataset.from_dict({"text": texts, "label": y})

# ➜ turn the int column into ClassLabel so stratification is allowed
class_names = [id2label[i] for i in range(len(id2label))]
raw_ds = raw_ds.cast_column("label", ClassLabel(num_classes=len(class_names),
                                                names=class_names))

ds = raw_ds.train_test_split(test_size=0.20,
                             stratify_by_column="label",
                             seed=42)

# ------------------------------------------------------------
# 2. tokenizer + dynamic pad collator
model_name = "microsoft/deberta-v3-small"
tok = AutoTokenizer.from_pretrained(model_name)

def tokenize(batch):
    return tok(batch["text"],
               padding="max_length",
               truncation=True,
               max_length=256)
ds_tok = ds.map(tokenize, batched=True, remove_columns=["text"])

data_collator = DataCollatorWithPadding(tok, pad_to_multiple_of=8)

# ------------------------------------------------------------
# 3. class weights (train split only)
train_labels = np.array(ds_tok["train"]["label"])
classes, counts = np.unique(train_labels, return_counts=True)
class_weights = torch.tensor(len(train_labels) / counts, dtype=torch.float)

# ------------------------------------------------------------
# 4. model
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=len(classes),
    id2label=id2label,
    label2id=label2id,
)

# ------------------------------------------------------------
# 5. weighted-loss trainer
class WeightedTrainer(Trainer):
    def compute_loss(self, model, inputs, return_outputs=False, **kwargs):
        labels = inputs.pop("labels", None)          
        if labels is None:
            labels = inputs.pop("label")             
        outputs = model(**inputs)
        logits  = outputs.logits
        loss_fct = torch.nn.CrossEntropyLoss(weight=class_weights.to(model.device))
        loss = loss_fct(logits, labels)
        return (loss, outputs) if return_outputs else loss

# ------------------------------------------------------------
# 6. training args
args = TrainingArguments(
    output_dir="runs/deberta-topic",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    learning_rate=2e-5,
    num_train_epochs=30,
    weight_decay=0.01,
    eval_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="accuracy",
    remove_unused_columns=False,   
    report_to="none",          
)

# ------------------------------------------------------------
# 7. metrics
metric_acc = evaluate.load("accuracy")
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return metric_acc.compute(predictions=preds, references=labels)

# ------------------------------------------------------------
# 8. train
trainer = WeightedTrainer(
    model=model,
    args=args,
    train_dataset=ds_tok["train"],
    eval_dataset=ds_tok["test"],
    tokenizer=tok,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

trainer.train()