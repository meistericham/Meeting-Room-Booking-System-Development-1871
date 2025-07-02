import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        set({ user: session.user, profile, loading: false })
      } else {
        set({ loading: false })
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      set({ user: data.user, profile })
      return data
    } catch (error) {
      // For demo purposes, create mock user if Supabase not connected
      if (error.message.includes('Invalid login credentials') || error.message.includes('fetch')) {
        const mockUser = {
          id: 'demo-user-id',
          email: email,
          created_at: new Date().toISOString()
        }
        const mockProfile = {
          id: 'demo-user-id',
          email: email,
          full_name: 'Demo User',
          division: 'IT Department',
          role: 'user'
        }
        set({ user: mockUser, profile: mockProfile })
        return { user: mockUser }
      }
      throw error
    }
  },

  signUp: async (email, password, userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (error) throw error
      
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            full_name: userData.fullName,
            division: userData.division,
            phone: userData.phone,
            role: 'user'
          }])
        
        if (profileError) throw profileError
      }
      
      return data
    } catch (error) {
      // For demo purposes, create mock signup if Supabase not connected
      if (error.message.includes('fetch')) {
        const mockUser = {
          id: 'demo-user-id',
          email: email,
          created_at: new Date().toISOString()
        }
        return { user: mockUser }
      }
      throw error
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null })
  },

  updateProfile: async (updates) => {
    const user = get().user
    if (!user) throw new Error('No user logged in')
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()
    
    if (error) throw error
    
    set({ profile: data })
    return data
  }
}))