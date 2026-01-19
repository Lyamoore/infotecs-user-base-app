import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../../pages/login"
import { UsersPage } from "../../pages/users"
import { NotFoundPage } from "../../pages/not-found"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
