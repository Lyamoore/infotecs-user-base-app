import React from "react"
import { Button, Form, Input, Typography, notification } from "antd"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "../api/login"
import { saveToken } from "../model/auth"

const { Title } = Typography

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (token) => {
      saveToken(token)
      navigate("/users")
    },
    onError: (error: Error) => {
      notification.error({
        message: "Ошибка авторизации",
        description: error.message,
      })
    },
  })

  const onFinish = (values: { login: string; password: string }) => {
    mutate(values)
  }

  return (
    <div
      style={{
        maxWidth: 320,
        margin: "120px auto 0",
        textAlign: "left",
      }}
    >
      <Title level={4} style={{ marginBottom: 24 }}>
        Авторизация
      </Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
          style={{ marginBottom: 16 }}
        >
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
          style={{ marginBottom: 24 }}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
        >
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </div>
      </Form>
    </div>
  )
}
