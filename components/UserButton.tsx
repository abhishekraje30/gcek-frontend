"use client"

import { DownOutlined, LogoutOutlined, SmileOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, MenuProps, Space } from "antd"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export const UserButton = () => {
  const session = useSession()
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "3",
      label: <Link href="/auth/change-password">Change Password</Link>,
    },
    {
      key: "4",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => signOut({ callbackUrl: "/auth/sign-in" }),
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
