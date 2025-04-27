# Legecy AI

A modern AI-powered assistant for mental health counselors .

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **PostgreSQL**: Relational database
- **SQLAlchemy**: ORM for database interactions
- **OpenAI**: AI capabilities for code analysis
- **FAISS**: Vector similarity search for embeddings
- **Transformers**: ML models for NLP tasks

### Frontend
- **React**: UI library for building the interface
- **React Router**: For application routing
- **TailwindCSS**: Utility-first CSS framework
- **React Markdown**: For rendering markdown content

### Infrastructure
- **Docker**: Containerization for consistent environments
- **Docker Compose**: Multi-container orchestration

## Installation

### Prerequisites
- Docker and Docker Compose
- OpenAI API key

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/legecy_ai.git
cd legecy_ai
```

2. Create an `.env` file in the root directory with the following variables:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=legecy_ai
DATABASE_URL=postgresql://postgres:password@db:5432/legecy_ai
OPENAI_API_KEY=your_openai_api_key
```

3. Start the application using Docker Compose:
```bash
docker-compose up -d
```

4. Access the application at http://localhost:80

## Project Structure

```
legecy_ai/
├── backend/              # FastAPI backend
│   ├── main.py           # Main application entry point
│   ├── database.py       # Database configuration
│   ├── models.py         # Database models
│   ├── categorize.py     # Code categorization endpoints
│   ├── examples.py       # Example generation endpoints
│   ├── advice.py         # Code advice endpoints
│   ├── chat.py           # Chat interface endpoints
│   ├── summarization.py  # Code summarization endpoints
│   └── requirements.txt  # Python dependencies
├── legecy_ai/            # React frontend
│   ├── src/              # Frontend source code
│   ├── public/           # Public assets
│   └── package.json      # JS dependencies
├── data_exploration/     # Notebooks and scripts for model development
│   ├── counsel_chat_analysis.ipynb
│   ├── model_training.py
│   └── generating_embeddings.py
└── docker-compose.yaml   # Docker composition file
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| POSTGRES_USER | PostgreSQL username |
| POSTGRES_PASSWORD | PostgreSQL password |
| POSTGRES_DB | PostgreSQL database name |
| DATABASE_URL | Full database connection string |
| OPENAI_API_KEY | Your OpenAI API key for AI capabilities |

## Development

### Backend Development

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development

```bash
cd legecy_ai
npm install
npm start
```
