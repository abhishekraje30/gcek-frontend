import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomTextAreaInput from "components/FormInputs/CustomTextAreaInput"

export const ProfessionalSummarySchema = zod.object({
  professional_summary: zod
    .string({ required_error: "Professional summary required!" })
    .min(1, { message: "Professional summary required!" }),
})

function getDefaultValues(userInfo: any): any {
  return {
    professional_summary: userInfo?.professional_summary || "",
  }
}

export default function ProfessionalSummary({
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
    resolver: zodResolver(ProfessionalSummarySchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  useEffect(() => {
    reset(getDefaultValues(profileData))
  }, [profileData, reset])

  const onSubmit: SubmitHandler<zod.infer<typeof ProfessionalSummarySchema>> = async (data) => {
    setLoading(true)
    const formattedData = {
      ...data,
      profile_completeness: 35,
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-6">
          <div className="w-full flex-1">
            <CustomTextAreaInput
              showCount
              maxLength={100}
              control={control}
              name="professional_summary"
              label="Professional Summary"
              rows={8}
              type="text-area"
              className="!w-full"
            />
          </div>
          <AlertNotification message={message} status={status} />
          <div className="mt-2 flex flex-1 justify-end gap-2">
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
        </div>
      </form>
    </div>
  )
}
