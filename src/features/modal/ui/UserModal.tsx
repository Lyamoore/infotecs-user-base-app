import React, { useEffect } from "react"
import { Modal, Form, Input, Button, Space } from "antd"
import { useMutation } from "@tanstack/react-query"
import { createUser, updateUser, deleteUser } from "../api/users"
import { UserModalProps } from "../model/types"

import * as S from "./UserModal.styles"

export const UserModal: React.FC<UserModalProps> = ({
  visible,
  onClose,
  user,
  onSuccess,
}) => {
  const [form] = Form.useForm()
  const isEdit = Boolean(user)

  useEffect(() => {
    if (!visible) return

    if (user) {
      form.setFieldsValue(user)
    } else {
      form.resetFields()
    }
  }, [user, visible, form])

  const mutation = useMutation({
    mutationFn: (values: { name: string; avatar: string }) => {
      if (isEdit && user) {
        return updateUser(user.id, values)
      }
      return createUser(values)
    },
    onSuccess: () => {
      onSuccess?.()
      onClose()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      onSuccess?.()
      onClose()
    },
  })

  const isLoading = mutation.isPending || deleteMutation.isPending

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        mutation.mutate(values)
      })
      .catch(() => {})
  }

  const handleDelete = () => {
      if (!user) return

      deleteMutation.mutate(user.id)
  }

  return (
    <Modal
      open={visible}
      destroyOnHidden
      title={isEdit ? "Редактирование пользователя" : "Создание пользователя"}
      onCancel={isLoading ? undefined : onClose}
      footer={null}
      maskClosable={!isLoading}
    >
      <Form form={form} layout="vertical">
        {isEdit && (
          <Form.Item label="id" name="id">
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя пользователя" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ссылка на аватарку"
          name="avatar"
          rules={[
            { required: true, message: "Введите ссылку на аватар" },
            { type: "url", message: "Введите корректную ссылку" },
          ]}
        >
          <Input />
        </Form.Item>

        <S.Footer>
          <div>
            {isEdit && (
              <Button
                type="primary"
                onClick={handleDelete}
                disabled={isLoading}
                style={{ minWidth: 110 }}
              >
                Удалить
              </Button>
            )}
          </div>

          <S.Actions>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isLoading}
              style={{ minWidth: 120 }}
            >
              {isEdit ? "Сохранить" : "Создать"}
            </Button>

            <Button
              type="primary"
              onClick={onClose}
              disabled={isLoading}
              style={{ minWidth: 110 }}
            >
              Отмена
            </Button>
          </S.Actions>
        </S.Footer>
      </Form>
    </Modal>
  )
}
