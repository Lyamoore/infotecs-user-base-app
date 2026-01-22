import React from "react"
import { Button, List, Avatar } from "antd"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../entities/user/api/users"
import { User } from "../../entities/user/model/types"
import dayjs from "dayjs"
import { removeToken } from "../../features/auth/model/auth"
import { useNavigate } from "react-router-dom"

export const UsersPage: React.FC = () => {
  const navigate = useNavigate()

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  const handleLogout = () => {
    removeToken()
    navigate("/login")
  }

  const handleCreateUser = () => {}

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 24,
        }}
      >
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </div>

      <List
        loading={isLoading}
        dataSource={users}
        split
        itemLayout="horizontal"
        renderItem={(user: User) => (
          <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={user.avatar}
                  size={40}
                  style={{ marginRight: 12, cursor: "pointer" }}
                />
              }
              title={
                <span style={{ fontWeight: 600, cursor: "pointer" }}>
                  {user.name}
                </span>
              }
              description={
                <span style={{ color: "#666" }}>
                  Зарегистрирован {dayjs(user.date).format("DD.MM.YYYY")}
                </span>
              }
            />
          </List.Item>
        )}
      />

      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={handleCreateUser}>
          Создать пользователя
        </Button>
      </div>
    </div>
  )
}
