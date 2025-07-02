import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { format, addDays, startOfMonth, endOfMonth } from 'date-fns'

export const useBookingStore = create((set, get) => ({
  bookings: [],
  rooms: [],
  equipment: [],
  loading: false,
  
  fetchRooms: async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('name')
    
    if (error) throw error
    set({ rooms: data || [] })
    return data
  },
  
  fetchEquipment: async () => {
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .order('name')
    
    if (error) throw error
    set({ equipment: data || [] })
    return data
  },
  
  fetchBookings: async (month = new Date()) => {
    set({ loading: true })
    try {
      const startDate = startOfMonth(month)
      const endDate = endOfMonth(month)
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          room:rooms(name, capacity),
          user:profiles(full_name, division)
        `)
        .gte('date', format(startDate, 'yyyy-MM-dd'))
        .lte('date', format(endDate, 'yyyy-MM-dd'))
        .order('date')
        .order('start_time')
      
      if (error) throw error
      set({ bookings: data || [], loading: false })
      return data
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },
  
  createBooking: async (bookingData) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select(`
        *,
        room:rooms(name, capacity),
        user:profiles(full_name, division)
      `)
      .single()
    
    if (error) throw error
    
    const currentBookings = get().bookings
    set({ bookings: [...currentBookings, data] })
    
    return data
  },
  
  updateBooking: async (id, updates) => {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        room:rooms(name, capacity),
        user:profiles(full_name, division)
      `)
      .single()
    
    if (error) throw error
    
    const currentBookings = get().bookings
    const updatedBookings = currentBookings.map(booking =>
      booking.id === id ? data : booking
    )
    set({ bookings: updatedBookings })
    
    return data
  },
  
  deleteBooking: async (id) => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    const currentBookings = get().bookings
    const filteredBookings = currentBookings.filter(booking => booking.id !== id)
    set({ bookings: filteredBookings })
  },
  
  checkAvailability: async (roomId, date, startTime, endTime, excludeBookingId = null) => {
    let query = supabase
      .from('bookings')
      .select('*')
      .eq('room_id', roomId)
      .eq('date', date)
      .eq('status', 'approved')
      .or(`start_time.lt.${endTime},end_time.gt.${startTime}`)
    
    if (excludeBookingId) {
      query = query.neq('id', excludeBookingId)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data?.length === 0
  }
}))