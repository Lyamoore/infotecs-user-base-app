import React, { useEffect } from "react"
import { LoginForm } from "../../features/auth/ui/LoginForm"
import { isAuth } from "../../features/auth/model/auth"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth()) {
      navigate("/users")
    }
  }, [navigate])

  return <LoginForm />
}
