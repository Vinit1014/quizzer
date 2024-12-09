'use client'

import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quizzer</h3>
            <p className="text-gray-600">Revolutionizing interactive learning experiences</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Cookie Policy</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/Vinit1014" className="text-gray-600 hover:text-gray-800"><Github /></a>
              <a href="https://x.com/VinitPr32845926" className="text-gray-600 hover:text-gray-800"><Twitter /></a>
              <a href="https://www.linkedin.com/in/vinit-prajapati-644890201/" className="text-gray-600 hover:text-gray-800"><Linkedin /></a>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>&copy; 2024 Quizzer. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

