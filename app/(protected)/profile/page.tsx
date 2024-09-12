"use client"

import { Steps, StepsProps } from "antd"
import { useState } from "react"
import AluminiDetails from "components/AluminiProfile/AluminiDetails"
import AcademicDetails from "components/StudentProfile/AcademicDetails"
import PersonalDetails from "components/StudentProfile/PersonalDetails"
import { STUDENT_ROLE } from "configs/constants"
import { useCurrentUser, useGetCurrentUserRole } from "hooks/use-current-user"
import { useGetData, useGetOrCreateData, useUpdateData } from "hooks/useCRUD"

export default function Profile() {
  const [current, setCurrent] = useState(0)

  const user = useCurrentUser()
  const userRoles = useGetCurrentUserRole()
  const userUrl = `/document/User/${user?.email}`
  const userMetadataUrl = `/document/NextAuthUser/${user?.email}`
  const profileUrl = `/document/${userRoles.includes(STUDENT_ROLE) ? "Student" : "Alumini"} Profile`
  const { data: userData } = useGetData(userUrl)
  const { data: userMetadata } = useGetData(userMetadataUrl)
  const { data: userProfileData } = useGetOrCreateData(profileUrl, user?.email, {
    profile_email_id: user?.email,
  })
  const profileData = { ...userData, ...userMetadata, ...userProfileData }
  const { update: updateUserData } = useUpdateData(userUrl)
  const { update: updateUserMetadata } = useUpdateData(userMetadataUrl)
  const { update: updateStudentProfile } = useUpdateData(`${profileUrl}/${user?.email}`)
  const { update: updateAluminiProfile } = useUpdateData(`${profileUrl}/${user?.email}`)
  const items: StepsProps["items"] = [
    {
      title: "Personal Details",
    },
    {
      title: "Academic Details",
    },
  ]

  const StudentProfileContent = [
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
      {userRoles.includes(STUDENT_ROLE) ? (
        <>
          <Steps current={current} items={items} />
          <div className="grid place-content-center p-4 shadow-md">{StudentProfileContent[current]?.children}</div>
        </>
      ) : (
        <AluminiDetails
          profileData={profileData}
          updateUserData={updateUserData}
          updateAluminiProfile={updateAluminiProfile}
        />
      )}
    </main>
  )
}
