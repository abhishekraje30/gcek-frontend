"use client"
import { Button, Card, Divider, Progress } from "antd"
import Link from "next/link"
import HeaderSidebar from "components/HeaderSidebar"
import { useCurrentUser } from "hooks/use-current-user"
import { useGetOrCreateData } from "hooks/useCRUD"
import { useState } from "react"

// export const metadata: Metadata = {
//   title: "Home",
// }

export default function Web() {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const { data: studentProfileData } = useGetOrCreateData(`/document/Student Profile`, user?.email, {
    student_email_id: user?.email,
  })
  const profileCompleteness = studentProfileData?.profile_completeness
  return (
    <>
      <HeaderSidebar />
      <main className="mt-2">
        <div className="mx-auto mt-4 w-3/4 md:w-1/4">
          <Card title={<span className="flex justify-center text-lg font-bold">Profile Completion</span>}>
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
                <Button type="primary" loading={loading} onClick={() => setLoading(true)}>
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
