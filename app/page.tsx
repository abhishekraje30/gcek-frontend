"use client"
import { Button, Card, Divider, Progress } from "antd"
import Link from "next/link"
import { useState } from "react"
import HeaderSidebar from "components/HeaderSidebar"
import { PROFILE_ROUTE, STUDENT_ROLE } from "configs/constants"
import { useCurrentUser, useGetCurrentUserRole } from "hooks/use-current-user"
import { useGetOrCreateData } from "hooks/useCRUD"

// export const metadata: Metadata = {
//   title: "Home",
// }

export default function Web() {
  const user = useCurrentUser()
  const userRoles = useGetCurrentUserRole()
  const [loading, setLoading] = useState(false)
  const profileUrl = `/document/${userRoles.includes(STUDENT_ROLE) ? "Student" : "Alumini"} Profile`
  const { data: studentProfileData } = useGetOrCreateData(profileUrl, user?.email, {
    profile_email_id: user?.email,
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
              <Link href={PROFILE_ROUTE}>
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
