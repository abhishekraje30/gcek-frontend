"use client"

import Image from "next/image"
import { useCurrentUser } from "hooks/use-current-user"
import { useGetData } from "hooks/useCRUD"

const getMonthYearFormat = (date: string) => {
  const d = new Date(date)
  const month = d.toLocaleString("default", { month: "long" })
  const year = d.getFullYear()
  return `${month} ${year}`
}

export default function DigitalResume() {
  const userInfo = useCurrentUser()
  const { email } = userInfo
  const userUrl = `/document/User/${email}`
  const userMetadataUrl = `/document/NextAuthUser/${email}`
  const profileUrl = `/document/Student Profile/${email}`
  const { data: userData } = useGetData(userUrl)
  const { data: userMetadata } = useGetData(userMetadataUrl)
  const { data: userProfileData } = useGetData(profileUrl)
  const profileData = { ...userData, ...userMetadata, ...userProfileData }
  console.log(profileData)

  if (!profileData || Object.keys(profileData).length === 0) {
    return null
  }

  console.log(profileData)

  return (
    <div className="m-4 mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-white shadow-lg">
      <div className="flex h-1/6 w-full">
        <div className="grid w-[30%] place-content-center bg-[#163852] px-4">
          <div className="grid size-[150px] place-content-center overflow-hidden rounded-full border-2 border-gray-300">
            {profileData?.profile_photo && (
              <Image
                src={`${process.env.NEXT_PUBLIC_FRAPPE_DOMAIN_NAME}${profileData?.profile_photo}`}
                alt="Profile Picture"
                width={150}
                height={150}
                objectFit="cover"
              />
            )}
          </div>
        </div>
        <div className="flex w-[70%] flex-col justify-center pl-8">
          <div className="flex gap-3">
            {profileData?.first_name && profileData?.last_name && (
              <>
                <h1 className="text-4xl font-bold tracking-wide">{profileData?.first_name.toUpperCase()}</h1>
                <h1 className="text-4xl font-bold tracking-wide">{profileData?.last_name.toUpperCase()}</h1>
              </>
            )}
          </div>
          <h2 className="font-semibold">{profileData?.degree_branch}</h2>
          <hr className="my-2 w-1/12 border-2 border-[#163853]" />
        </div>
      </div>
      <div className="flex h-5/6 w-full">
        <div className="flex h-full w-[30%] flex-col gap-4 bg-[#163852] px-4 text-white">
          <div>
            <h1 className="text-xl font-bold tracking-wider">CONTACT</h1>
            <hr className="my-1 border border-white" />
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-sm">{profileData?.phone}</p>
              <p className="text-sm">{email}</p>
              <p className="text-sm">
                {profileData?.location}, {profileData?.state}
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">EDUCATION</h1>
            <hr className="my-1 border border-white" />
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-semibold">B.Tech</h2>
                <p className="text-sm">Government College of Engineering, Karad</p>
                {profileData?.degree_marking_system === "Percentage" ? (
                  <p className="text-sm">Percentage: {profileData.degree_percentage} %</p>
                ) : (
                  <p className="text-sm">CGPA: {profileData.degree_cgpa}</p>
                )}
                <p className="text-xs">
                  {`${getMonthYearFormat(profileData?.degree_joining_year)} - ${getMonthYearFormat(
                    profileData?.degree_passing_year
                  )}`}
                </p>
              </div>
              <div>
                {profileData?.hsc_or_diploma === "HSC" ? (
                  <>
                    <h2 className="font-semibold tracking-wider">H.S.C</h2>
                    <p className="text-sm">{profileData.hsc_board_name}</p>
                    {profileData?.hsc_marking_system === "Percentage" ? (
                      <p className="text-sm">Percentage: {profileData.hsc_percentage} %</p>
                    ) : (
                      <p className="text-sm">CGPA: {profileData.hsc_cgpa}</p>
                    )}
                    <p className="text-xs">{`${new Date(profileData?.hsc_passing_year).getFullYear()}`}</p>
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold tracking-wider">Diploma</h2>
                    {/* <p className="text-sm">{profileData.hsc_board_name}</p> */}
                    {profileData?.diploma_marking_system === "Percentage" ? (
                      <p className="text-sm">Percentage: {profileData.diploma_percentage} %</p>
                    ) : (
                      <p className="text-sm">CGPA: {profileData.diploma_cgpa}</p>
                    )}
                    <p className="text-xs">{`${new Date(profileData?.diploma_passing_year).getFullYear()}`}</p>
                  </>
                )}
              </div>
              <div>
                <h2 className="font-semibold tracking-wider">S.S.C</h2>
                <p className="text-sm">{profileData.ssc_board_name}</p>
                {profileData?.ssc_marking_system === "Percentage" ? (
                  <p className="text-sm">Percentage: {profileData.ssc_percentage} %</p>
                ) : (
                  <p className="text-sm">CGPA: {profileData.ssc_cgpa}</p>
                )}
                <p className="text-xs">{`${new Date(profileData?.ssc_passing_year).getFullYear()}`}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">SKILLS</h1>
            <hr className="my-1 border border-white" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Technical Skills</h2>
                <ol className="flex list-inside list-disc flex-col gap-2">
                  <li className="text-sm">{profileData?.tech_skill_1}</li>
                  <li className="text-sm">{profileData?.tech_skill_2}</li>
                  <li className="text-sm">{profileData?.tech_skill_3}</li>
                  {profileData?.tech_skill_4 && <li className="text-sm">{profileData?.tech_skill_4}</li>}
                  {profileData?.tech_skill_5 && <li className="text-sm">{profileData?.tech_skill_5}</li>}
                </ol>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Soft Skills</h2>
                <ol className="flex list-inside list-disc flex-col gap-2">
                  <li className="text-sm">{profileData?.soft_skill_1}</li>
                  <li className="text-sm">{profileData?.soft_skill_2}</li>
                  {profileData?.soft_skill_3 && <li className="text-sm">{profileData?.soft_skill_3}</li>}
                </ol>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">LANGUAGES</h1>
            <hr className="my-1 border border-white" />
            <ol className="flex list-disc flex-col gap-2 px-4">
              <li className="text-sm">English</li>
              <li className="text-sm">Marathi</li>
              <li className="text-sm">Hindi</li>
            </ol>
          </div>
        </div>
        <div className="flex h-full w-[70%] flex-col gap-4 px-4 text-justify">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">SUMMARY</h1>
            <hr className="my-1 border border-[#163853]" />
            <div className="mt-4">
              <p className="w-full break-words text-justify text-sm">{profileData?.professional_summary}</p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">PROJECT</h1>
            <hr className="my-1 border border-[#163853]" />
            <h3 className="font-bold">{profileData?.project_title}</h3>
            <p className="break-words text-justify text-sm">{profileData?.project_summary}</p>
            <ol className="flex list-inside list-disc flex-col gap-2 text-sm">
              <li>{profileData?.project_description_1}</li>
              <li>{profileData?.project_description_2}</li>
              {profileData?.project_description_3 && <li>{profileData?.project_description_3}</li>}
              {profileData?.project_description_4 && <li>{profileData?.project_description_4}</li>}
            </ol>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">INTERNSHIP / TRAINING</h1>
            <hr className="my-1 border border-[#163853]" />
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{profileData?.company_name}</h3>
              <h3 className="text-xs">{`${getMonthYearFormat(
                profileData?.internship_joining_date
              )} - ${getMonthYearFormat(profileData?.internship_completion_date)}`}</h3>
            </div>

            <ol className="flex list-inside list-disc flex-col gap-2 text-sm">
              <li className="">{profileData?.responsibility_1}</li>
              <li>{profileData?.responsibility_2}</li>
              {profileData?.responsibility_3 && <li>{profileData?.responsibility_3}</li>}
            </ol>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">CENTER OF EXCELLENCE</h1>
            <hr className="my-1 border border-[#163853]" />
            <h3 className="">
              {profileData?.center_of_excellence === "Other"
                ? profileData?.other_center_of_excellence
                : profileData?.center_of_excellence}
            </h3>
          </div>
          {/* <div>
            <h1 className="text-xl font-bold tracking-wider text-[#163853]">
              EXTRACURRICULAR ACTIVITIES / ACHIEVEMENTS
            </h1>
            <hr className="my-1 border border-[#163853]" />

            <ol className="list-inside list-disc text-sm">
              <li className="">
                Developed a microcontroller-based system that automatically waters plants based on soil moisture levels.
                Utilized Arduino, sensors, and Python to create the control system.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero numquam, corporis voluptatem quas
                dolorem harum debitis exercitationem nisi placeat commodi?
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores deserunt aspernatur placeat provident,
                voluptatum id praesentium cupiditate repellendus iure quasi!
              </li>
            </ol>
          </div> */}
        </div>
      </div>
    </div>
  )
}
