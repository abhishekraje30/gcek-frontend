"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useState } from "react"
import { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextAreaInput from "components/FormInputs/CustomTextAreaInput"
import CustomTextInput from "components/FormInputs/CustomTextInput"

const ProjectDetailsSchema = zod.object({
  project_title: zod
    .string({ required_error: "Project title is required" })
    .min(3, "Project title should be at least 3 characters long")
    .max(100, "Project title should be at most 100 characters long"),
  project_summary: zod
    .string({ required_error: "Project summary is required" })
    .min(10, "Project summary should be at least 10 characters long")
    .max(100, "Project summary should be at most 100 characters long"),
  project_description_1: zod.string({ required_error: "Project description is required" }),
  project_description_2: zod.string({ required_error: "Project description is required" }),
  project_description_3: zod.string(),
})

const getDefaultValues = (userInfo: any): any => {
  return {
    projectTitle: userInfo?.projectTitle || "",
    projectDescription: userInfo?.projectDescription || "",
    projectLink: userInfo?.projectLink || "",
  }
}

export default function ProjectDetails({
  currentTab,
  setTab,
  updateStudentProfile,
  profileData,
}: {
  currentTab: number
  setTab: (tab: number) => void
  updateStudentProfile: any
  profileData: any
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const { control, handleSubmit, reset, watch, formState } = useForm({
    resolver: zodResolver(ProjectDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<zod.infer<typeof ProjectDetailsSchema>> = async (data) => {
    setLoading(true)
    const formattedData = {
      profile_completeness: 100,
      ...data,
    }
    try {
      await updateStudentProfile(formattedData)
      setMessage("Profile updated successfully")
      setStatus("success")
    } catch (error) {
      console.error("Error updating profile:", error)
      setLoading(false)
      setMessage("Error updating profile")
      setStatus("error")
    }
    setLoading(false)
  }
  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div>
            <CustomTextInput control={control} name="projectTitle" label="Project Title" />
          </div>
          <div className="w-full flex-1">
            <CustomTextAreaInput
              showCount
              maxLength={100}
              control={control}
              name="project_summary"
              label="Brief Description"
              rows={5}
              type="text-area"
              className="!w-full"
            />
          </div>
          <div>
            <CustomTextAreaInput
              showCount
              maxLength={50}
              control={control}
              name="project_description_1"
              label="Project Description 1"
              rows={2}
              type="text-area"
              className="!w-full"
            />
          </div>
          <div>
            <CustomTextAreaInput
              showCount
              maxLength={50}
              control={control}
              name="project_description_2"
              label="Project Description 2"
              rows={2}
              type="text-area"
              className="!w-full"
            />
          </div>
          <div>
            <CustomTextAreaInput
              showCount
              maxLength={50}
              control={control}
              name="project_description_3"
              label="Project Description 3"
              rows={2}
              type="text-area"
              className="!w-full"
            />
          </div>
          <div>
            <CustomTextAreaInput
              showCount
              maxLength={50}
              control={control}
              name="project_description_4"
              label="Project Description 4"
              rows={2}
              type="text-area"
              className="!w-full"
            />
          </div>
        </div>
        <div className="mt-2 flex flex-1 justify-end gap-2">
          <Button type="primary" htmlType="button" onClick={() => setTab(currentTab - 1)}>
            Prev
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          <Button type="primary" htmlType="button" onClick={() => setTab(currentTab + 1)}>
            Next
          </Button>
        </div>
      </form>
    </div>
  )
}
