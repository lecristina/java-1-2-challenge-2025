"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

type User = {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any; success: boolean }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: any; success: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false, // Alterado de true para false
  signIn: async () => ({ error: null, success: false }),
  signUp: async () => ({ error: null, success: false }),
  signOut: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (data.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message, success: false }
      }

      return { error: null, success: true }
    } catch (error: any) {
      return { error: error.message, success: false }
    }
  }

  // Modificar a função signUp para desabilitar a verificação de email
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: undefined,
        },
      })

      if (error) {
        console.error("Erro no signUp:", error)
        return { error: error.message, success: false }
      }

      // Após o registro bem-sucedido, faça login automaticamente
      if (data.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          console.error("Erro ao fazer login após registro:", signInError)
        }
      }

      return { error: null, success: true }
    } catch (error: any) {
      console.error("Erro no processo de signUp:", error)
      return { error: error.message, success: false }
    }
  }

  // Update the signOut function to ensure it redirects to login-simple
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push("/dashboard/login-simple")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
