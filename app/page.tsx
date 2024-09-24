"use client"
import { Button, Card, Divider, Progress } from "antd"
import Link from "next/link"
import { useState } from "react"
import HeaderSidebar from "components/HeaderSidebar"
import { DIGITAL_RESUME, PROFILE_ROUTE, STUDENT_ROLE } from "configs/constants"
import { useCurrentUser, useGetCurrentUserRole } from "hooks/use-current-user"
import { useGetOrCreateData } from "hooks/useCRUD"

// export const metadata: Metadata = {
//   title: "Home",
// }

export default function Web() {
  const user = useCurrentUser()
  const userRoles = useGetCurrentUserRole()
  const [loading, setLoading] = useState(false)
  const [digitalResumeLoading, setDigitalResumeLoading] = useState(false)
  const profileUrl = `/document/${userRoles.includes(STUDENT_ROLE) ? "Student" : "Alumini"} Profile`
  const { data: studentProfileData } = useGetOrCreateData(profileUrl, user?.email, {
    profile_email_id: user?.email,
  })
  const profileCompleteness = studentProfileData?.profile_completeness
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <HeaderSidebar />
      </div>

      <main className="mt-2">
        <div className="mx-auto mt-4 w-3/4">
          <Card title={<span className="flex justify-center text-lg font-bold">Profile Completion</span>}>
            <div className="grid place-content-center">
              <Progress
                type="dashboard"
                percent={profileCompleteness}
                status={profileCompleteness !== 100 ? "active" : "success"}
              />
            </div>
            <Divider />
            <div className="flex flex-col items-center justify-center gap-4">
              <Link href={PROFILE_ROUTE}>
                <Button type="primary" loading={loading} onClick={() => setLoading(true)}>
                  {profileCompleteness !== 100 ? "Complete Profile" : "View or Update Profile"}
                </Button>
              </Link>
              <Button
                type="primary"
                loading={digitalResumeLoading}
                onClick={() => setDigitalResumeLoading(true)}
                disabled={profileCompleteness !== 100}
              >
                <Link href={DIGITAL_RESUME}>Digital Resume</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
