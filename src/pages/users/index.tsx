import React, { useState } from "react"
import { Button, List, Avatar, Modal } from "antd"
import dayjs from "dayjs"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUsers } from "../../entities/user/api/users"
import { User } from "../../entities/user/model/types"
import { removeToken } from "../../features/auth/model/auth"
import { useNavigate } from "react-router-dom"
import { UserModal } from "../../features/modal/ui/UserModal"

import * as S from "./UsersPage.styles"

export const UsersPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  const handleLogout = () => {
    removeToken()
    navigate("/login")
  }

  const handleCreateUser = () => {
    setSelectedUser(undefined)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  return (
    <S.Page>
      <S.Header>
        <Button type="primary" onClick={handleLogout}>
          Выход
        </Button>
      </S.Header>

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
                  onClick={() => handleEditUser(user)}
                />
              }
              title={
                <span
                  style={{ fontWeight: 600, cursor: "pointer" }}
                  onClick={() => handleEditUser(user)}
                >
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

      <S.Footer>
        <Button type="primary" onClick={handleCreateUser}>
          Создать пользователя
        </Button>
      </S.Footer>

      <UserModal
        visible={isModalOpen}
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["users"] })
        }}
      />
    </S.Page>
  )
}
