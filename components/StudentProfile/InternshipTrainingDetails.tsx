import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomDateRangeInput from "components/FormInputs/CustomDateRangePicker"
import CustomTextAreaInput from "components/FormInputs/CustomTextAreaInput"
import CustomTextInput from "components/FormInputs/CustomTextInput"

const InternshipTrainingDetailsSchema = zod.object({
  projectTitle: zod
    .string({ required_error: "Company Name is required" })
    .min(3, "Company Name should be at least 3 characters long")
    .max(100, "Company Name should be at most 100 characters long"),
  responsibilities: zod.string({ required_error: "Responsibilities is required" }),
  project_description_1: zod.string({ required_error: "Project description is required" }),
  project_description_2: zod.string({ required_error: "Project description is required" }),
  project_description_3: zod.string(),
})

const getDefaultValues = (userInfo: any): any => {
  return {
    projectTitle: userInfo?.projectTitle || "",
    duration: userInfo?.duration || "",
    responsibilities: userInfo?.responsibilities || "",
    project_description_1: userInfo?.project_description_1 || "",
    project_description_2: userInfo?.project_description_2 || "",
    project_description_3: userInfo?.project_description_3 || "",
  }
}

export default function InternshipTrainingDetails({
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
    resolver: zodResolver(InternshipTrainingDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<zod.infer<typeof InternshipTrainingDetailsSchema>> = async (data) => {
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
          <div className="flex-2">
            <CustomTextInput control={control} name="projectTitle" label="Company Name" />
          </div>
          <div className="w-1/2">
            <CustomDateRangeInput control={control} name="duration" label="Duration" picker="month" />
          </div>
          <div>
            <CustomTextAreaInput
              showCount
              maxLength={50}
              control={control}
              name="responsibility_1"
              label="Responsibility 1"
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
              name="responsibility_2"
              label="Responsibility 2"
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
              name="responsibility_3"
              label="Responsibility 3"
              rows={2}
              type="text-area"
              className="!w-full"
            />
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-2">
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
