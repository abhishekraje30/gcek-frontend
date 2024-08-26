"use client"
import {
  AppstoreOutlined,
  CalendarOutlined,
  CloseSquareOutlined,
  HomeOutlined,
  MailOutlined,
  MenuOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { Button, Drawer, Menu, MenuProps } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { UserButton } from "./UserButton"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
  { key: "1", label: <Link href="/">Home</Link>, icon: <HomeOutlined /> },
  { key: "2", label: <Link href="/profile">Profile</Link>, icon: <ProfileOutlined /> },
  { key: "3", label: <Link href="/career-calendar">Career Calendar</Link>, icon: <CalendarOutlined /> },
]

export default function HeaderSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <header className="sticky left-0 top-0 flex items-center justify-between border-b border-gray-300 p-2 shadow-md">
        <div className="flex items-center gap-2">
          <div
            className="grid size-11 cursor-pointer place-content-center rounded-full hover:bg-gray-300"
            onClick={toggleSidebar}
          >
            <MenuOutlined />
          </div>
          <Link href={"/"} className="hidden items-center gap-2 md:flex">
            <Image src={"/gcek logo.png"} alt="GCEK logo" width={35} height={35} className="size-auto rounded-full" />
            <span className="ml-1 text-xl font-bold">Government college of engineering, Karad</span>
          </Link>
        </div>

        <UserButton />
      </header>

      <Drawer
        placement="left"
        title="Menu"
        onClose={toggleSidebar}
        open={isSidebarOpen}
        // closable={false}
        closeIcon={
          <div>
            <CloseSquareOutlined />
          </div>
        }
      >
        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["1"]} mode="inline" items={items} />
      </Drawer>
    </div>
  )
}
