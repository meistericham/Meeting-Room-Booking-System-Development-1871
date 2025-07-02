import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiClock, FiUsers, FiShield, FiTrendingUp, FiSmartphone, FiArrowRight } = FiIcons

export default function Home() {
  const features = [
    {
      icon: FiCalendar,
      title: 'Easy Booking',
      description: 'Book meeting rooms with a simple, intuitive interface. Choose your preferred room, time, and equipment.'
    },
    {
      icon: FiClock,
      title: 'Real-time Availability',
      description: 'Check room availability in real-time and avoid booking conflicts with our smart scheduling system.'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Coordinate with your team, add participants, and manage group bookings effortlessly.'
    },
    {
      icon: FiShield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security and reliable cloud infrastructure.'
    },
    {
      icon: FiTrendingUp,
      title: 'Smart Analytics',
      description: 'AI-powered insights help optimize room usage and suggest the best meeting times.'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Friendly',
      description: 'Access the system from any device with our responsive design and mobile-optimized interface.'
    }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Meeting Room
              <span className="text-primary-600"> Booking System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your office meetings with our intelligent booking platform. 
              Book rooms, manage schedules, and collaborate seamlessly with AI-powered automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
              <Link
                to="/public-schedule"
                className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center space-x-2"
              >
                <span>View Public Schedule</span>
                <SafeIcon icon={FiArrowRight} />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-primary-200 rounded-full opacity-20"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Efficient Meetings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage meeting rooms 
              effectively and boost your team's productivity.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Meeting Experience?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of organizations already using our platform to streamline their meeting management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Your Free Trial
              </Link>
              <Link
                to="/signin"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}