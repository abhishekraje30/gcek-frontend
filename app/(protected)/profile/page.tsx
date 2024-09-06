"use client"

import { Steps, StepsProps, Tabs, TabsProps } from "antd"
import { useState } from "react"
import AcademicDetails from "components/StudentProfile/AcademicDetails"
import PersonalDetails from "components/StudentProfile/PersonalDetails"
import { useCurrentUser } from "hooks/use-current-user"
import { useGetData, useUpdateData } from "hooks/useCRUD"

export default function Profile() {
  const [current, setCurrent] = useState(0)

  const user = useCurrentUser()
  const userUrl = `/document/User/${user?.email}`
  const userMetadataUrl = `/document/NextAuthUser/${user?.email}`
  const studentProfileUrl = `/document/Student Profile/${user?.email}`
  const { data: userData } = useGetData(userUrl)
  const { data: userMetadata } = useGetData(userMetadataUrl)
  const { data: studentProfileData } = useGetData(studentProfileUrl)
  const profileData = { ...userData, ...userMetadata, ...studentProfileData }
  const { update: updateUserData } = useUpdateData(userUrl)
  const { update: updateUserMetadata } = useUpdateData(userMetadataUrl)
  const { update: updateStudentProfile } = useUpdateData(studentProfileUrl)
  const items: StepsProps["items"] = [
    {
      title: "Personal Details",
    },
    {
      title: "Academic Details",
    },
  ]

  const content = [
    {
      key: 0,
      children: (
        <PersonalDetails
          currentTab={current}
          setTab={setCurrent}
          updateUserData={updateUserData}
          updateUserMetadata={updateUserMetadata}
          profileData={profileData}
          updateStudentProfile={updateStudentProfile}
        />
      ),
    },
    {
      key: 1,
      children: (
        <AcademicDetails
          currentTab={current}
          setTab={setCurrent}
          updateStudentProfile={updateStudentProfile}
          profileData={profileData}
        />
      ),
    },
  ]

  return (
    <main className="grid place-content-center p-2">
      <Steps current={current} items={items} />
      <div className="grid place-content-center p-4 shadow-md">{content[current]?.children}</div>
    </main>
  )
}
