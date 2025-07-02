import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiMapPin, FiX } = FiIcons

export default function MonthlyCalendar({ bookings = [], currentMonth, onMonthChange, onBookingClick }) {
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const getBookingsForDay = (day) => {
    return bookings.filter(booking => 
      isSameDay(new Date(booking.date), day)
    )
  }
  
  const getBookingColor = (booking) => {
    if (booking.status === 'cancelled') return 'bg-red-100 border-red-300 text-red-800'
    if (booking.status === 'approved') return 'bg-green-100 border-green-300 text-green-800'
    if (booking.status === 'pending') return 'bg-yellow-100 border-yellow-300 text-yellow-800'
    return 'bg-gray-100 border-gray-300 text-gray-800'
  }
  
  const previousMonth = () => {
    onMonthChange(subMonths(currentMonth, 1))
  }
  
  const nextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1))
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiChevronLeft} className="text-xl" />
          </button>
          
          <h2 className="text-2xl font-bold text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiChevronRight} className="text-xl" />
          </button>
        </div>
      </div>
      
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 divide-x divide-gray-200">
        {days.map((day, dayIdx) => {
          const dayBookings = getBookingsForDay(day)
          const isToday = isSameDay(day, new Date())
          
          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] p-2 ${
                isSameMonth(day, currentMonth) ? 'bg-white' : 'bg-gray-50'
              } ${dayIdx % 7 !== 6 ? 'border-r' : ''} border-b border-gray-200`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isToday
                  ? 'bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                  : isSameMonth(day, currentMonth)
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map(booking => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => onBookingClick?.(booking)}
                    className={`px-2 py-1 rounded text-xs font-medium cursor-pointer border transition-all ${getBookingColor(booking)}`}
                  >
                    <div className="flex items-center space-x-1">
                      {booking.status === 'cancelled' && (
                        <SafeIcon icon={FiX} className="text-xs flex-shrink-0" />
                      )}
                      <span className="truncate">
                        {booking.status === 'cancelled' ? 'CANCELLED: ' : ''}
                        {booking.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1 text-xs opacity-75">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} />
                        <span>{booking.start_time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiMapPin} />
                        <span>{booking.room?.name}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {dayBookings.length > 3 && (
                  <div className="text-xs text-gray-500 px-2 py-1">
                    +{dayBookings.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}