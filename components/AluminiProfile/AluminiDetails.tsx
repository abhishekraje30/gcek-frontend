import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomDateInput from "components/FormInputs/CustomDate"

import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextInput from "components/FormInputs/CustomTextInput"
import { branchURL, genderOptions } from "configs/constants"
import { AluminiDetailsSchema } from "configs/schemas"
import { useGetData } from "hooks/useCRUD"
import { getFrappeDate } from "utils/frappe-datatypes"
import { getAluminiYearList } from "utils/helper"

const getDefaultValues = (userInfo: any) => {
  return {
    first_name: userInfo?.first_name ?? "",
    last_name: userInfo?.last_name ?? "",
    email: userInfo?.email ?? "",
    phone: userInfo?.phone ?? "",
    birth_date: userInfo?.birth_date
      ? new Date(userInfo.birth_date)
      : new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    gender: userInfo?.gender ?? "",
    branch: userInfo?.branch ?? "",
    joining_year: userInfo?.joining_year ?? "",
    passing_year: userInfo?.passing_year ?? "",
    linkedin_url: userInfo?.linkedin_url ?? "",
  }
}

export default function AluminiDetails({
  profileData,
  updateAluminiProfile,
  updateUserData,
}: {
  profileData: any
  updateAluminiProfile: any
  updateUserData: any
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const { data: branchNames } = useGetData(branchURL)
  const branchOptions = branchNames?.map((branch: any) => ({
    value: branch.branch_name,
    label: branch.branch_name,
  }))
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(AluminiDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  // Automatically update form values when userInfo changes
  useEffect(() => {
    if (profileData) {
      reset(getDefaultValues(profileData))
    }
  }, [reset, profileData])

  const onSubmit: SubmitHandler<zod.infer<typeof AluminiDetailsSchema>> = async (data: any) => {
    setLoading(true)
    const formattedData = {
      ...data,
      birth_date: getFrappeDate(data.birth_date),
    }
    try {
      await updateUserData(formattedData)
      await updateAluminiProfile({ profile_completeness: 100, ...formattedData })
      setMessage("Profile updated successfully")
      setStatus("success")
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage("Error updating profile")
      setStatus("error")
    }
    setLoading(false)
  }

  return (
    <div className="p-4 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div className="flex-1">
            <CustomTextInput name="first_name" control={control} label="First Name" required />
          </div>
          <div className="flex-1">
            <CustomTextInput name="last_name" control={control} label="Last Name" required />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div className="flex-1">
            <CustomTextInput name="email" control={control} label="Email" type="email" disabled required />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="phone"
              control={control}
              label="Mobile Number"
              type="tel"
              addonBefore="+91"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1">
            <CustomDateInput
              name="birth_date"
              control={control}
              label="Date of birth"
              required
              allowClear={false}
              format={"DD-MM-YYYY"}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect name="gender" control={control} label="Gender" options={genderOptions} required />
          </div>
        </div>
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
              options={getAluminiYearList()}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              name="passing_year"
              control={control}
              label="Passing Year"
              placeholder="Select Passing Year"
              required
              options={getAluminiYearList()}
            />
          </div>
        </div>
        <div className="flex-1">
          <CustomTextInput name="linkedin_url" required control={control} label="LinkedIn Profile URL" type="url" />
        </div>

        <AlertNotification message={message} status={status} />
        <div className="flex flex-1 justify-end gap-2">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
