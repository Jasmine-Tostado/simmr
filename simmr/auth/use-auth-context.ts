import { Session } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'
import { UsersSelect } from '@/types'

export type AuthData = {
  session?: Session | null
  userData?: UsersSelect | null
  isLoading: boolean
  isLoggedIn: boolean
}

export const AuthContext = createContext<AuthData>({
  session: undefined,
  userData: undefined,
  isLoading: true,
  isLoggedIn: false,
})

export const useAuthContext = () => useContext(AuthContext)