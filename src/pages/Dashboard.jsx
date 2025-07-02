import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookingStore } from '../store/bookingStore'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiPlus, FiCalendar, FiClock, FiUsers, FiSettings, FiTrendingUp, FiX } = FiIcons

export default function Dashboard() {
  const { user, profile } = useAuthStore()
  const { bookings, fetchBookings } = useBookingStore()
  
  React.useEffect(() => {
    fetchBookings()
  }, [fetchBookings])
  
  const userBookings = bookings.filter(booking => booking.user_id === user?.id)
  const pendingBookings = userBookings.filter(booking => booking.status === 'pending')
  const approvedBookings = userBookings.filter(booking => booking.status === 'approved')
  const cancelledBookings = userBookings.filter(booking => booking.status === 'cancelled')
  
  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin'
  const isSuperAdmin = profile?.role === 'super_admin'
  
  const adminStats = isAdmin ? {
    totalBookings: bookings.length,
    pendingApproval: bookings.filter(b => b.status === 'pending').length,
    approvedToday: bookings.filter(b => 
      b.status === 'approved' && 
      new Date(b.date).toDateString() === new Date().toDateString()
    ).length
  } : null
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name || user?.email}!
          </h1>
          <p className="text-gray-600">
            {isAdmin ? 'Manage bookings and system settings' : 'Book meeting rooms and manage your reservations'}
          </p>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Link
            to="/book-room"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                <SafeIcon icon={FiPlus} className="text-primary-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Book Room</h3>
                <p className="text-sm text-gray-600">Create new booking</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/my-bookings"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <SafeIcon icon={FiCalendar} className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">My Bookings</h3>
                <p className="text-sm text-gray-600">View your reservations</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/public-schedule"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <SafeIcon icon={FiUsers} className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Public Schedule</h3>
                <p className="text-sm text-gray-600">View all bookings</p>
              </div>
            </div>
          </Link>
          
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <SafeIcon icon={FiSettings} className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Admin Panel</h3>
                  <p className="text-sm text-gray-600">Manage system</p>
                </div>
              </div>
            </Link>
          )}
        </motion.div>
        
        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {isAdmin ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{adminStats.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiCalendar} className="text-primary-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-3xl font-bold text-yellow-600">{adminStats.pendingApproval}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiClock} className="text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Meetings</p>
                    <p className="text-3xl font-bold text-green-600">{adminStats.approvedToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Status</p>
                    <p className="text-lg font-semibold text-green-600">Operational</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiTrendingUp} className="text-green-600" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{userBookings.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiCalendar} className="text-primary-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">{pendingBookings.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiClock} className="text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-3xl font-bold text-green-600">{approvedBookings.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-3xl font-bold text-red-600">{cancelledBookings.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiX} className="text-red-600" />
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          
          {userBookings.length > 0 ? (
            <div className="space-y-4">
              {userBookings.slice(0, 5).map(booking => (
                <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    booking.status === 'approved' ? 'bg-green-500' :
                    booking.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{booking.title}</p>
                    <p className="text-sm text-gray-600">
                      {booking.room?.name} • {new Date(booking.date).toLocaleDateString()} • {booking.start_time}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <SafeIcon icon={FiCalendar} className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-600">No bookings yet. Create your first booking to get started!</p>
              <Link
                to="/book-room"
                className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} />
                <span>Book a Room</span>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}