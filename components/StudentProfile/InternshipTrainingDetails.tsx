import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomDateInput from "components/FormInputs/CustomDate"
import CustomTextAreaInput from "components/FormInputs/CustomTextAreaInput"
import CustomTextInput from "components/FormInputs/CustomTextInput"

const InternshipTrainingDetailsSchema = zod.object({
  company_name: zod.string({ required_error: "Company name is required" }),
  internship_joining_date: zod.date({ required_error: "Internship joining date is required" }),
  internship_completion_date: zod.date({ required_error: "Internship completion date is required" }),
  responsibility_1: zod.string({ required_error: "Responsibility 1 is required" }),
  responsibility_2: zod.string({ required_error: "Responsibility 2 is required" }),
  responsibility_3: zod.string().optional(),
})

const getDefaultValues = (userInfo: any): any => {
  return {
    company_name: userInfo?.company_name,
    internship_joining_date: userInfo?.internship_joining_date
      ? new Date(userInfo.internship_joining_date)
      : new Date(),
    internship_completion_date: userInfo?.internship_completion_date
      ? new Date(userInfo.internship_completion_date)
      : new Date(),
    responsibility_1: userInfo?.responsibility_1,
    responsibility_2: userInfo?.responsibility_2,
    responsibility_3: userInfo?.responsibility_3,
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
  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(InternshipTrainingDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  useEffect(() => {
    reset(getDefaultValues(profileData))
  }, [profileData, reset])

  const onSubmit: SubmitHandler<zod.infer<typeof InternshipTrainingDetailsSchema>> = async (data) => {
    setLoading(true)
    const formattedData = {
      ...data,
      profile_completeness: profileData?.profile_completeness <= 80 ? 80 : profileData?.profile_completeness,
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
            <CustomTextInput control={control} name="company_name" label="Company Name" required />
          </div>
          <div className="flex w-1/2 gap-2">
            <div className="flex-1">
              <CustomDateInput
                control={control}
                name="internship_joining_date"
                picker="month"
                label="Internship Joining Date"
                placeholder="Internship Joining Year"
                format={"MM-YYYY"}
                required
              />
            </div>
            <div className="flex-1">
              <CustomDateInput
                control={control}
                name="internship_completion_date"
                picker="month"
                label="Internship Completion Date"
                placeholder="Internship Completion Date"
                format={"MM-YYYY"}
                required
              />
            </div>
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
              required
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
              required
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
        <AlertNotification message={message} status={status} />
        <div className="flex flex-1 justify-end gap-2">
          <Button type="primary" htmlType="button" onClick={() => setTab(currentTab - 1)}>
            Prev
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!formState.isValid}>
            Save
          </Button>
          {Object.keys(formState.errors).length === 0 && formState.isValid && (
            <Button type="primary" htmlType="button" onClick={() => setTab(currentTab + 1)}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
