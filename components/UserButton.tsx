"use client"

import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, MenuProps, Space } from "antd"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { PROFILE_ROUTE, RESET_PASSWORD, SIGN_IN } from "configs/constants"

export const UserButton = () => {
  const session = useSession()
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={PROFILE_ROUTE}>Profile</Link>,
    },
    {
      key: "2",
      label: <Link href={RESET_PASSWORD}>Change Password</Link>,
    },
    {
      key: "3",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOut({ callbackUrl: SIGN_IN }),
    },
  ]
  return (
    <Dropdown menu={{ items }} placement="bottomLeft" className="cursor-pointer">
      <Space>
        {session.data?.user?.image ? (
          <Avatar src={session.data?.user?.image} size="large" icon={<UserOutlined />} />
        ) : (
          <Avatar size="large" icon={<UserOutlined />} />
        )}
      </Space>
    </Dropdown>
  )
}
