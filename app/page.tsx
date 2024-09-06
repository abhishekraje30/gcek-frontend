"use client"
import { Button, Card, Divider, Progress } from "antd"
import Link from "next/link"
import { useState } from "react"
import HeaderSidebar from "components/HeaderSidebar"
import { useGetData } from "hooks/useCRUD"
import { useCurrentUser } from "hooks/use-current-user"

// export const metadata: Metadata = {
//   title: "Home",
// }

export default function Web() {
  const user = useCurrentUser()
  const studentProfileUrl = `/document/Student Profile/${user?.email}`
  const { data: studentProfileData } = useGetData(studentProfileUrl)
  const profileCompleteness = studentProfileData?.profile_completeness
  return (
    <>
      <HeaderSidebar />
      <main className="mt-2">
        <div className="mx-auto mt-4 w-1/4">
          <Card title="Profile Completion %">
            <div className="grid place-content-center">
              <Progress
                type="dashboard"
                percent={profileCompleteness}
                status={profileCompleteness !== 100 ? "active" : "success"}
              />
            </div>
            <Divider />
            <div className="mx-auto grid place-content-center">
              <Link href="/profile">
                <Button type="primary">
                  {profileCompleteness !== 100 ? "Complete Profile" : "View or Update Profile"}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
