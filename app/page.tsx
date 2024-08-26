"use client"
import { Button, Card, Divider, Progress } from "antd"
import Link from "next/link"
import { useState } from "react"
import HeaderSidebar from "components/HeaderSidebar"

// export const metadata: Metadata = {
//   title: "Home",
// }

export default function Web() {
  const [percent, setPercent] = useState(0)
  return (
    <>
      <HeaderSidebar />
      <main className="mt-2">
        <div className="mx-auto mt-4 w-1/4">
          <Card title="Profile Completion %">
            <div className="grid place-content-center">
              <Progress type="dashboard" percent={percent} status={percent !== 100 ? "active" : "success"} />
            </div>
            <Divider />
            <div className="mx-auto grid place-content-center">
              <Link href="/profile">
                <Button type="primary">Complete Profile</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
