'use client'

import { motion } from "framer-motion"
import { BookOpen, Users, Zap, Trophy } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: "Create Engaging Quizzes",
    description: "Easily design quizzes manually or with AI assistance"
  },
  {
    icon: Users,
    title: "Real-time Interaction",
    description: "Students join quiz rooms and participate in live sessions"
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "See results and leaderboards update in real-time"
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description: "Monitor student performance across multiple quizzes"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

