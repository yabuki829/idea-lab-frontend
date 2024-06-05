import Login from '@/components/auth/Login'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'

import React from 'react'


const LoginPage = async () => {
    const user = await getAuthSession()
    if (user) {
        redirect("/")
    }
  return <Login/>
}

export default LoginPage