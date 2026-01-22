import React from "react"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import { isAuth } from "../../features/auth/model/auth"

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    if (isAuth()) {
      navigate("/users")
    } else {
      navigate("/login")
    }
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Button type="primary" onClick={handleGoHome}>
          На главную
        </Button>
      }
    />
  )
}
