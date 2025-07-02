import React from 'react'
import { useBookingStore } from '../store/bookingStore'
import MonthlyCalendar from '../components/Calendar/MonthlyCalendar'
import BookingModal from '../components/Booking/BookingModal'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiInfo } = FiIcons

export default function PublicSchedule() {
  const { bookings, loading, fetchBookings } = useBookingStore()
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [selectedBooking, setSelectedBooking] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  
  React.useEffect(() => {
    fetchBookings(currentMonth)
  }, [currentMonth, fetchBookings])
  
  const handleBookingClick = (booking) => {
    setSelectedBooking(booking)
    setModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedBooking(null)
  }
  
  const approvedBookings = bookings.filter(booking => 
    booking.status === 'approved' || booking.status === 'cancelled'
  )
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiCalendar} className="text-white text-xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Public Meeting Schedule</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View all approved meeting room bookings. Click on any booking to see detailed information.
          </p>
        </motion.div>
        
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
        >
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-1">Schedule Information</h3>
              <p className="text-sm text-blue-700">
                This calendar shows all approved meeting room bookings. Cancelled meetings are marked with ❌ and shown in red.
                Only approved and cancelled bookings are visible to maintain privacy of pending requests.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-4 mb-8"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-sm text-gray-600">Approved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span className="text-sm text-gray-600">Cancelled</span>
            </div>
          </div>
        </motion.div>
        
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MonthlyCalendar
            bookings={approvedBookings}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            onBookingClick={handleBookingClick}
          />
        </motion.div>
        
        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {approvedBookings.filter(b => b.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved Bookings</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {approvedBookings.filter(b => b.status === 'cancelled').length}
            </div>
            <div className="text-sm text-gray-600">Cancelled Bookings</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {new Set(approvedBookings.map(b => b.room?.name)).size}
            </div>
            <div className="text-sm text-gray-600">Rooms in Use</div>
          </div>
        </motion.div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal
        booking={selectedBooking}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}