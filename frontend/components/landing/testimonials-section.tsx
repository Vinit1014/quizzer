'use client'

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "Quizzer has transformed how I engage with my students. It's so easy to use!",
    author: "Sarah Johnson",
    role: "High School Teacher"
  },
  {
    quote: "The real-time leaderboard keeps me motivated to do my best in every quiz.",
    author: "Mike Chen",
    role: "University Student"
  },
  {
    quote: "Creating quizzes with AI assistance saves me so much time. Highly recommended!",
    author: "Emily Rodriguez",
    role: "College Professor"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

