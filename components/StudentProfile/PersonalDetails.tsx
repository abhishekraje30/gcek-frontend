"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import { fetcher } from "actions/user-actions"
import AlertNotification from "components/AlertNotification"
import CustomDateInput from "components/FormInputs/CustomDate"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomTextInput from "components/FormInputs/CustomTextInput"
import { genderOptions } from "configs/constants"
import { StudentPersonalDetailsSchema } from "configs/schemas"
import { getFrappeDate } from "utils/frappe-datatypes"

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
    house_details: userInfo?.house_details ?? "",
    area_details: userInfo?.area_details ?? "",
    pincode: userInfo?.pincode ?? "",
    location: userInfo?.location ?? "",
    state: userInfo?.state ?? "",
  }
}

export default function PersonalDetails({
  currentTab,
  setTab,
  updateUserData,
  updateUserMetadata,
  profileData,
  updateStudentProfile,
}: {
  currentTab: number
  setTab: (tab: number) => void
  updateUserData: any
  updateUserMetadata: any
  profileData: any
  updateStudentProfile: any
}) {
  const [loading, setLoading] = useState(false)
  const [pincodeLoading, setPincodeLoading] = useState(false)
  const [saveError, setSaveError] = useState(false)

  const { control, handleSubmit, setValue, setError, reset, formState } = useForm({
    resolver: zodResolver(StudentPersonalDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  // Automatically update form values when userInfo changes
  useEffect(() => {
    if (profileData) {
      reset(getDefaultValues(profileData))
    }
  }, [reset, profileData])

  const onSubmit: SubmitHandler<zod.infer<typeof StudentPersonalDetailsSchema>> = async (data) => {
    setLoading(true)
    const formattedData = {
      ...data,
      birth_date: getFrappeDate(data.birth_date),
    }
    try {
      await updateUserData(formattedData)
      await updateUserMetadata(formattedData)
      await updateStudentProfile({ profile_completeness: 10, ...formattedData })
      setTab(currentTab + 1)
    } catch (error) {
      console.error("Error updating profile:", error)
      setSaveError(true)
    }
    setLoading(false)
  }

  const handlePincodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    setPincodeLoading(true)
    const { value } = e.target
    if (value.length === 6 && value.match(/^[0-9]+$/) !== null) {
      const response = await fetcher(`https://api.postalpincode.in/pincode/${value}`)
      if (response && response[0].Status === "Success") {
        const { PostOffice } = response[0]
        setValue("pincode", value, { shouldValidate: true })
        setValue("location", PostOffice[0].Name)
        setValue("state", PostOffice[0].State)
      } else {
        setError("pincode", {
          type: "manual",
          message: "Invalid Pincode",
        })
        setValue("location", "")
        setValue("state", "")
      }
    }
    setPincodeLoading(false)
  }
  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1">
            <CustomTextInput name="house_details" control={control} label="Flat no., Apartment" />
          </div>
          <div className="flex-1">
            <CustomTextInput name="area_details" control={control} label="Area, Street, Village" />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex-1">
            <CustomTextInput
              name="pincode"
              control={control}
              label="Pincode"
              showCount
              maxLength={6}
              required
              onBlur={handlePincodeBlur}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput name="location" control={control} label="Town/City" disabled={pincodeLoading} required />
          </div>
          <div className="flex-1">
            <CustomTextInput name="state" control={control} label="State" disabled={pincodeLoading} required />
          </div>
        </div>
        {saveError && (
          <AlertNotification
            message={saveError ? "Error updating profile" : "Profile updated successfully"}
            status={saveError ? "error" : "success"}
          />
        )}
        <div className="flex flex-1 justify-end gap-2">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          {Object.keys(formState.errors).length === 0 && (
            <Button type="primary" htmlType="button" onClick={() => setTab(currentTab + 1)}>
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
