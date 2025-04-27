import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      initials: "DR",
      name: "Dr. Rebecca Johnson",
      role: "Licensed Clinical Psychologist",
      quote: "CounselAI has revolutionized my practice. The session summarization tool alone saves me 5+ hours of documentation time each week, and the AI recommendations have helped me approach complex cases with fresh perspectives."
    },
    {
      initials: "MT",
      name: "Michael Tran, LMFT",
      role: "Marriage & Family Therapist",
      quote: "As someone who always struggled with note-taking during sessions, this platform has been a game-changer. Now I can be fully present with my clients knowing the AI will help me capture important details and themes."
    }
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">What Counselors Are Saying</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
