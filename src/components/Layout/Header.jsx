import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import { motion } from 'framer-motion'

const { FiCalendar, FiUser, FiLogOut, FiMenu, FiX } = FiIcons

export default function Header() {
  const { user, profile, signOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  
  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }
  
  const isPublicSchedule = location.pathname === '/public-schedule'
  
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiCalendar} className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-900">RoomBook</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isPublicSchedule && (
              <Link
                to="/public-schedule"
                className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                Public Schedule
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <SafeIcon icon={FiUser} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {profile?.full_name || user.email}
                  </span>
                  {profile?.role === 'admin' && (
                    <span className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                      Admin
                    </span>
                  )}
                  {profile?.role === 'super_admin' && (
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      Super Admin
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiLogOut} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              !isPublicSchedule && (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-2">
            {!isPublicSchedule && (
              <Link
                to="/public-schedule"
                className="block px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Public Schedule
              </Link>
            )}
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2 text-sm text-gray-600">
                  {profile?.full_name || user.email}
                  {profile?.role === 'admin' && (
                    <span className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              !isPublicSchedule && (
                <>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}