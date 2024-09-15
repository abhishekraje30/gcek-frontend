"use client"
import { CalendarOutlined, CloseSquareOutlined, HomeOutlined, MenuOutlined, ProfileOutlined } from "@ant-design/icons"
import { Drawer, Menu, MenuProps } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CAREER_CALENDAR_ROUTE, HOME_ROUTE, PROFILE_ROUTE, UNVERIFIED } from "configs/constants"
import { useIsUserVerified } from "hooks/use-current-user"
import Loader from "./Loader"
import { UserButton } from "./UserButton"

type MenuItem = Required<MenuProps>["items"][number]

export default function HeaderSidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const IsUserVerified = useIsUserVerified()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (!IsUserVerified) {
    // Redirect to 'notverified' page if email is not verified
    router.push(UNVERIFIED)
  }

  const handleLinkClick = () => {
    setLoading(true)
    setIsSidebarOpen(false)
    setLoading(false)
  }

  const items: MenuItem[] = [
    {
      key: HOME_ROUTE,
      label: (
        <Link href={HOME_ROUTE} onClick={handleLinkClick}>
          Home
        </Link>
      ),
      icon: <HomeOutlined />,
    },
    {
      key: PROFILE_ROUTE,
      label: (
        <Link href={PROFILE_ROUTE} onClick={handleLinkClick}>
          Profile
        </Link>
      ),
      icon: <ProfileOutlined />,
    },
    {
      key: CAREER_CALENDAR_ROUTE,
      label: (
        <Link href={CAREER_CALENDAR_ROUTE} onClick={handleLinkClick}>
          Career Calendar
        </Link>
      ),
      icon: <CalendarOutlined />,
    },
  ]

  const getSelectedKeys = () => {
    return items.find((item) => item?.key === pathname)?.key
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

      {loading && <Loader />}

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
        <Menu
          defaultOpenKeys={["1"]}
          mode="inline"
          items={items}
          selectedKeys={[getSelectedKeys() || "/"].map(String)}
        />
      </Drawer>
    </div>
  )
}
