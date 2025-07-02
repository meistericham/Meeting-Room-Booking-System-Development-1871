import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiX, FiClock, FiMapPin, FiUser, FiBriefcase, FiUsers, FiMail, FiPhone, FiFileText, FiTool } = FiIcons

export default function BookingModal({ booking, isOpen, onClose }) {
  if (!booking) return null
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅'
      case 'cancelled': return '❌'
      case 'pending': return '⏳'
      default: return '📝'
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />
            
            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-2xl px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiFileText} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {booking.title}
                    </h3>
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      <span>{getStatusIcon(booking.status)}</span>
                      <span className="capitalize">{booking.status}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiX} className="text-xl" />
                </button>
              </div>
              
              {/* Content */}
              <div className="space-y-6">
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiClock} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Date & Time</p>
                      <p className="text-gray-900">
                        {format(new Date(booking.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-gray-600">
                        {booking.start_time} - {booking.end_time}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiMapPin} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Room</p>
                      <p className="text-gray-900">{booking.room?.name}</p>
                      <p className="text-gray-600">Capacity: {booking.room?.capacity} people</p>
                    </div>
                  </div>
                </div>
                
                {/* Organizer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiUser} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Officer in Charge</p>
                      <p className="text-gray-900">{booking.officer_in_charge}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiBriefcase} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Division</p>
                      <p className="text-gray-900">{booking.user?.division || booking.division}</p>
                    </div>
                  </div>
                </div>
                
                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiUsers} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Number of Participants</p>
                      <p className="text-gray-900">{booking.number_of_pax} people</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiTool} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Equipment Needed</p>
                      <p className="text-gray-900">{booking.equipment_needed || 'None'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiMail} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Contact Email</p>
                      <p className="text-gray-900">{booking.contact_email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiPhone} className="text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Contact Phone</p>
                      <p className="text-gray-900">{booking.contact_phone}</p>
                    </div>
                  </div>
                </div>
                
                {/* Purpose */}
                {booking.purpose && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Meeting Purpose</p>
                    <p className="text-gray-900">{booking.purpose}</p>
                  </div>
                )}
                
                {/* Admin Comments */}
                {booking.admin_comments && (
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 mb-2">Admin Comments</p>
                    <p className="text-blue-900">{booking.admin_comments}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}