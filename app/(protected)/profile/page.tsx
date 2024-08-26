"use client"

import { Steps, Tabs, TabsProps, StepsProps } from "antd"
import PersonalInformation from "components/StudentProfile/PersonalInformation"
import { useState } from "react"

export default function Profile() {
  const [current, setCurrent] = useState(0)
  const items: StepsProps["items"] = [
    {
      title: "Personal Information",
    },
    {
      title: "Academic Information",
    },
  ]

  const content = [
    { key: 0, children: <PersonalInformation /> },
    { key: 1, children: <div>Academic Information</div> },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <main className="grid place-content-center p-2">
      <Steps current={current} items={items} />
      <div className="grid place-content-center p-4 shadow-md">{content[current]?.children}</div>
    </main>
  )
}
