"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomTextInput"
import AlertNotification from "components/AlertNotification"

const SkillDetailsSchema = zod.object({
  tech_skill_1: zod.string({ required_error: "Technical Skill 1 is required" }),
  tech_skill_2: zod.string({ required_error: "Technical Skill 2 is required" }),
  tech_skill_3: zod.string({ required_error: "Technical Skill 3 is required" }),
  tech_skill_4: zod.string().optional(),
  tech_skill_5: zod.string().optional(),
  soft_skill_1: zod.string({ required_error: "Soft Skill 1 is required" }),
  soft_skill_2: zod.string({ required_error: "Soft Skill 2 is required" }),
  soft_skill_3: zod.string().optional(),
})

function getDefaultValues(userInfo: any): any {
  return {
    tech_skill_1: userInfo?.tech_skill_1,
    tech_skill_2: userInfo?.tech_skill_2,
    tech_skill_3: userInfo?.tech_skill_3,
    tech_skill_4: userInfo?.tech_skill_4,
    tech_skill_5: userInfo?.tech_skill_5,
    soft_skill_1: userInfo?.soft_skill_1,
    soft_skill_2: userInfo?.soft_skill_2,
    soft_skill_3: userInfo?.soft_skill_3,
  }
}

export default function SkillDetails({
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
    resolver: zodResolver(SkillDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<zod.infer<typeof SkillDetailsSchema>> = async (data) => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <h2 className="my-1 font-bold tracking-wide text-gray-700">Technical Skills</h2>
              <div className="flex flex-col gap-2">
                <div className="">
                  <CustomTextInput control={control} name="tech_skill_1" label="Technical Skill 1" required />
                </div>
                <div>
                  <CustomTextInput control={control} name="tech_skill_2" label="Technical Skill 2" required />
                </div>
                <div>
                  <CustomTextInput control={control} name="tech_skill_3" label="Technical Skill 3" required />
                </div>
                <div>
                  <CustomTextInput control={control} name="tech_skill_4" label="Technical Skill 4" />
                </div>
                <div>
                  <CustomTextInput control={control} name="tech_skill_5" label="Technical Skill 5" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="my-1 font-bold tracking-wide text-gray-700">Soft Skills</h2>
              <div className="flex flex-col gap-2">
                <div>
                  <CustomTextInput control={control} name="soft_skill_1" label="Soft Skill 1" required />
                </div>
                <div>
                  <CustomTextInput control={control} name="soft_skill_2" label="Soft Skill 2" required />
                </div>
                <div>
                  <CustomTextInput control={control} name="soft_skill_3" label="Soft Skill 3" />
                </div>
              </div>
            </div>
          </div>
          <AlertNotification message={message} status={status} />
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
        </div>
      </form>
    </div>
  )
}
