"use client"

import { Steps, StepsProps } from "antd"
import { useState } from "react"
import AluminiDetails from "components/AluminiProfile/AluminiDetails"
import AcademicDetails from "components/StudentProfile/AcademicDetails"
import InternshipTrainingDetails from "components/StudentProfile/InternshipTrainingDetails"
import PersonalDetails from "components/StudentProfile/PersonalDetails"
import ProfessionalSummary from "components/StudentProfile/ProfessionalSummary"
import ProfilePicture from "components/StudentProfile/ProfilePicture"
import ProjectDetails from "components/StudentProfile/ProjectDetails"
import SkillDetails from "components/StudentProfile/SkillDetails"
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
    {
      title: "Professional Summary",
    },
    {
      title: "Skills",
    },
    {
      title: "Project Details",
    },
    {
      title: "Internship/Training Details",
    },
    {
      title: "Profile Photo",
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
    {
      key: 2,
      children: (
        <ProfessionalSummary
          currentTab={current}
          setTab={setCurrent}
          updateStudentProfile={updateStudentProfile}
          profileData={profileData}
        />
      ),
    },
    {
      key: 3,
      children: (
        <SkillDetails
          currentTab={current}
          setTab={setCurrent}
          updateStudentProfile={updateStudentProfile}
          profileData={profileData}
        />
      ),
    },
    {
      key: 4,
      children: (
        <ProjectDetails
          currentTab={current}
          setTab={setCurrent}
          updateStudentProfile={updateStudentProfile}
          profileData={profileData}
        />
      ),
    },
    {
      key: 5,
      children: (
        <InternshipTrainingDetails
          currentTab={current}
          setTab={setCurrent}
          updateStudentProfile={updateStudentProfile}
          profileData={profileData}
        />
      ),
    },
    {
      key: 6,
      children: (
        <ProfilePicture
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
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <Steps current={current} items={items} />
          </div>

          <div className="flex flex-1 items-center justify-center p-4 shadow-md">
            {StudentProfileContent[current]?.children}
          </div>
        </div>
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
