import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      super_admins: {
        Row: {
          id: string
          user_id: string | null
          email: string
          full_name: string
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          email: string
          full_name: string
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          email?: string
          full_name?: string
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      hospitals: {
        Row: {
          id: string
          hospital_name: string
          hospital_code: string
          address: string | null
          phone: string | null
          email: string | null
          contact_person: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          hospital_name: string
          hospital_code: string
          address?: string | null
          phone?: string | null
          email?: string | null
          contact_person?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          hospital_name?: string
          hospital_code?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          contact_person?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      clinics: {
        Row: {
          id: string
          clinic_code: string
          clinic_name: string
          address: string | null
          phone: string | null
          email: string | null
          website: string | null
          logo_url: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
          contact_person: string | null
          license_number: string | null
          registration_date: string | null
          subscription_status: string | null
          total_patients: number | null
          last_login_date: string | null
          billing_address: string | null
          tax_id: string | null
          timezone: string | null
          country: string | null
          state: string | null
          city: string | null
          postal_code: string | null
          hospital_id: string | null
        }
        Insert: {
          id?: string
          clinic_code: string
          clinic_name: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          contact_person?: string | null
          license_number?: string | null
          registration_date?: string | null
          subscription_status?: string | null
          total_patients?: number | null
          last_login_date?: string | null
          billing_address?: string | null
          tax_id?: string | null
          timezone?: string | null
          country?: string | null
          state?: string | null
          city?: string | null
          postal_code?: string | null
          hospital_id?: string | null
        }
        Update: {
          id?: string
          clinic_code?: string
          clinic_name?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          logo_url?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          contact_person?: string | null
          license_number?: string | null
          registration_date?: string | null
          subscription_status?: string | null
          total_patients?: number | null
          last_login_date?: string | null
          billing_address?: string | null
          tax_id?: string | null
          timezone?: string | null
          country?: string | null
          state?: string | null
          city?: string | null
          postal_code?: string | null
          hospital_id?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          hospital_id: string | null
          plan_name: string
          status: string
          monthly_price: number
          yearly_price: number
          billing_cycle: string
          start_date: string
          end_date: string | null
          auto_renew: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hospital_id?: string | null
          plan_name: string
          status?: string
          monthly_price: number
          yearly_price: number
          billing_cycle?: string
          start_date?: string
          end_date?: string | null
          auto_renew?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hospital_id?: string | null
          plan_name?: string
          status?: string
          monthly_price?: number
          yearly_price?: number
          billing_cycle?: string
          start_date?: string
          end_date?: string | null
          auto_renew?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscription_templates: {
        Row: {
          id: string
          name: string
          plan_key: string
          monthly_price: number
          yearly_price: number
          features: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          plan_key: string
          monthly_price: number
          yearly_price: number
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          plan_key?: string
          monthly_price?: number
          yearly_price?: number
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}