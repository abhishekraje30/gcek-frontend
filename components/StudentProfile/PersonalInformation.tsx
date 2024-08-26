"use client"

import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { SubmitHandler, useForm } from "react-hook-form"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import { genderOptions } from "configs/constants"
import useSWR from "swr"
import { fetcher } from "actions/user-actions"
import { useCurrentUser } from "hooks/use-current-user"

const studentPersonalInfoSchema = zod
  .object({
    firstName: zod
      .string({ required_error: "First Name is required" })
      .min(3, { message: "First Name is too short" })
      .max(50, { message: "First Name is too long" }),
    lastName: zod.string(),
    email: zod.string().email({ message: "Invalid email address" }),
    mobile: zod.string(),
    dob: zod.date(),
    gender: zod.string({ required_error: "Gender is required" }).min(1, { message: "Gender is required" }),
    houseDetails: zod.string(),
    areaDetails: zod.string(),
    pincode: zod.string(),
    city: zod.string(),
    state: zod.string(),
  })
  .refine((fieldsData) => fieldsData.mobile.length === 10 && fieldsData.mobile.match(/^[0-9]+$/) !== null, {
    message: "Please give a valid mobile number",
    path: ["mobile"],
  })
  .refine((fieldsData) => fieldsData.pincode.length === 6 && fieldsData.pincode.match(/^[0-9]+$/) !== null, {
    message: "Pincode must be numeric",
    path: ["pincode"],
  })

export default function PersonalInformation() {
  // const { data, error, isLoading } = useSWR("/api/user", fetcher)
  const user = useCurrentUser()

  const { control, handleSubmit, setValue, setError } = useForm({
    resolver: zodResolver(studentPersonalInfoSchema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      mobile: "",
      dob: new Date(),
      gender: "",
      houseDetails: "",
      areaDetails: "",
      pincode: "",
      city: "",
      state: "",
    },
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<zod.infer<typeof studentPersonalInfoSchema>> = (data) => {
    console.log(data)
  }

  const handlePincodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length === 6 && value.match(/^[0-9]+$/) !== null) {
      const response = await fetcher(`https://api.postalpincode.in/pincode/${value}`)
      if (response && response[0].Status === "Success") {
        const { PostOffice } = response[0]
        setValue("pincode", value, { shouldValidate: true })
        setValue("city", PostOffice[0].Name)
        setValue("state", PostOffice[0].State)
      } else {
        setError("pincode", {
          type: "manual",
          message: "Invalid Pincode",
        })
        setValue("city", "")
        setValue("state", "")
      }
    }
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <CustomTextInput name="firstName" control={control} label="First Name" required />
          </div>
          <div className="flex-1">
            <CustomTextInput name="lastName" control={control} label="Last Name" required />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <CustomTextInput name="email" control={control} label="Email" type="email" disabled required />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="mobile"
              control={control}
              label="Mobile Number"
              type="tel"
              addonBefore="+91"
              required
            />
          </div>
        </div>

        <CustomRadioSelect name="gender" control={control} label="Gender" options={genderOptions} required />

        <div className="flex gap-2">
          <div className="flex-1">
            <CustomTextInput name="houseDetails" control={control} label="Flat no., Apartment" />
          </div>
          <div className="flex-1">
            <CustomTextInput name="areaDetails" control={control} label="Area, Street, Village" />
          </div>
        </div>

        <div className="flex gap-2">
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
            <CustomTextInput name="city" control={control} label="Town/City" disabled required />
          </div>
          <div className="flex-1">
            <CustomTextInput name="state" control={control} label="State" disabled required />
          </div>
        </div>
        <div className="text-end">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
