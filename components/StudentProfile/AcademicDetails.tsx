"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomInputNumber from "components/FormInputs/CustomInputNumber"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { StudentAcademicDetailsSchema } from "configs/schemas"
import { useGetData } from "hooks/useCRUD"
import { getYearList } from "utils/helper"

const getDefaultValues = (userInfo: any) => {
  return {
    branch: userInfo?.branch ?? "",
    joining_year: userInfo?.joining_year ?? "",
    passing_year: userInfo?.passing_year ?? "",
    average_cgpa: userInfo?.average_cgpa ?? "",
  }
}

export default function AcademicDetails({
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
  const [saveError, setSaveError] = useState(false)
  const branchURL = `/document/Engineering Branch?fields=["branch_name"]`
  const { data: branchNames } = useGetData(branchURL)
  const branchOptions = branchNames?.map((branch: any) => ({
    value: branch.branch_name,
    label: branch.branch_name,
  }))

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(StudentAcademicDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  // Automatically update form values when userInfo changes
  useEffect(() => {
    if (profileData) {
      reset(getDefaultValues(profileData))
    }
  }, [reset, profileData])

  const onSubmit: SubmitHandler<zod.infer<typeof StudentAcademicDetailsSchema>> = async (data) => {
    setLoading(true)
    const formattedData = {
      profile_completeness: 100,
      ...data,
    }
    try {
      await updateStudentProfile(formattedData)
    } catch (error) {
      console.error("Error updating profile:", error)
      setSaveError(true)
    }
    setLoading(false)
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex-1">
          <CustomSingleSelect
            name="branch"
            control={control}
            label="Branch"
            required
            placeholder="Select Branch"
            options={branchOptions}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 md:flex-row">
          <div className="flex-1">
            <CustomSingleSelect
              name="joining_year"
              control={control}
              label="Joining Year"
              placeholder="Select Joining Year"
              required
              options={getYearList()}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="passing_year"
              control={control}
              label="Passing Year"
              placeholder="Select Passing Year"
              required
              options={getYearList()}
            />
          </div>
        </div>
        <div className="flex-1">
          <CustomInputNumber
            max={10}
            min={0}
            name="average_cgpa"
            control={control}
            label="Average CGPA"
            placeholder="Enter Average CGPA"
            required
          />
        </div>

        {saveError && (
          <AlertNotification
            message={saveError ? "Error updating profile" : "Profile updated successfully"}
            status={saveError ? "error" : "success"}
          />
        )}
        <div className="flex flex-1 justify-end gap-2">
          <Button type="primary" htmlType="button" onClick={() => setTab(currentTab - 1)}>
            Prev
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
