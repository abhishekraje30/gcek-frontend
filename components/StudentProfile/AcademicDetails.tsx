"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomDateInput from "components/FormInputs/CustomDate"
import CustomInputNumber from "components/FormInputs/CustomInputNumber"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextInput from "components/FormInputs/CustomTextInput"
import { markingSystemOptions } from "configs/constants"
import { StudentAcademicDetailsSchema } from "configs/schemas"
import { useGetData } from "hooks/useCRUD"
import { useState } from "react"

const getDefaultValues = (userInfo: any) => {
  return {
    degree_branch: userInfo?.degree_branch,
    degree_joining_year: userInfo?.degree_joining_year,
    degree_passing_year: userInfo?.degree_passing_year,
    degree_marking_system: userInfo?.degree_marking_system ?? "Percentage",
    degree_percentage: userInfo?.degree_percentage,
    degree_cgpa: userInfo?.degree_cgpa,
    hsc_or_diploma: userInfo?.hsc_or_diploma ?? "HSC",
    hsc_board_name: userInfo?.hsc_board_name,
    hsc_passing_year: userInfo?.hsc_passing_year,
    hsc_marking_system: userInfo?.hsc_marking_system ?? "Percentage",
    hsc_percentage: userInfo?.hsc_percentage,
    hsc_cgpa: userInfo?.hsc_cgpa,
    diploma_passing_year: userInfo?.diploma_passing_year,
    diploma_branch: userInfo?.diploma_branch,
    diploma_marking_system: userInfo?.diploma_marking_system ?? "Percentage",
    diploma_percentage: userInfo?.diploma_percentage,
    diploma_cgpa: userInfo?.diploma_cgpa,
    ssc_board_name: userInfo?.ssc_board_name,
    ssc_passing_year: userInfo?.ssc_passing_year,
    ssc_marking_system: userInfo?.ssc_marking_system ?? "Percentage",
    ssc_percentage: userInfo?.ssc_percentage,
    ssc_cgpa: userInfo?.ssc_cgpa,
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
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const branchURL = `/document/Engineering Branch?fields=["branch_name"]`
  const { data: branchNames } = useGetData(branchURL)
  const branchOptions = branchNames?.map((branch: any) => ({
    value: branch.branch_name,
    label: branch.branch_name,
  }))

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(StudentAcademicDetailsSchema),
    defaultValues: getDefaultValues(profileData),
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<zod.infer<typeof StudentAcademicDetailsSchema>> = async (data) => {
    setLoading(true)
    console.log(data)
    const formattedData = {
      profile_completeness: 25,
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          {/* Degree Details */}
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="my-1 font-bold tracking-wide text-gray-700">Degree Details</h2>
            <div className="">
              <CustomSingleSelect
                name="degree_branch" // Done
                control={control}
                label="Branch"
                placeholder="Select Your Degree Branch"
                options={branchOptions}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <CustomDateInput
                  control={control}
                  name="degree_joining_year"
                  picker="year"
                  label="Degree Joining Year"
                  placeholder="Degree Joining Year"
                  format={"YYYY"}
                />
              </div>
              <div className="flex-1">
                <CustomDateInput
                  control={control}
                  name="degree_passing_year"
                  picker="year"
                  label="Degree Passing Year"
                  placeholder="Degree Passing Year"
                  format={"YYYY"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <CustomRadioSelect
                  name="degree_marking_system"
                  control={control}
                  label="Marking System"
                  options={markingSystemOptions}
                />
              </div>
              <div>
                {watch("degree_marking_system") === "Percentage" ? (
                  <CustomInputNumber
                    min={0}
                    max={100}
                    addonAfter={"%"}
                    control={control}
                    name="degree_percentage" // Done
                    label="Percentage"
                    placeholder="Enter Your Degree Percentage"
                  />
                ) : (
                  <CustomInputNumber
                    min={0}
                    max={10}
                    control={control}
                    name="degree_cgpa" // Done
                    label="CGPA"
                    placeholder="Enter Your Degree Average CGPA"
                  />
                )}
              </div>
            </div>
          </div>
          {/* HSC or Diploma Details */}
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="my-1 font-bold tracking-wide text-gray-700">H.S.C or Diploma Details</h2>
            <CustomRadioSelect
              name="hsc_or_diploma" // Done
              control={control}
              label="H.S.C or Diploma?"
              options={[
                {
                  label: "H.S.C",
                  value: "HSC",
                },
                {
                  label: "Diploma",
                  value: "Diploma",
                },
              ]}
            />

            {watch("hsc_or_diploma") === "HSC" ? (
              <div className="flex flex-col gap-2">
                <div>
                  <CustomTextInput
                    name="hsc_board_name" // Done
                    label="Board Name"
                    control={control}
                    maxLength={100}
                    placeholder="State Board of Maharashtra"
                  />
                </div>

                <div className="flex-1">
                  <CustomDateInput
                    name="hsc_passing_year" // Done
                    control={control}
                    picker="year"
                    label="Passing Year"
                    placeholder="Select Passing Year"
                    format={"YYYY"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <CustomRadioSelect
                      name="hsc_marking_system" // Done
                      control={control}
                      label="Marking System"
                      options={markingSystemOptions}
                    />
                  </div>
                  <div>
                    {watch("hsc_marking_system") === "Percentage" ? (
                      <CustomInputNumber
                        min={0}
                        max={100}
                        addonAfter={"%"}
                        control={control}
                        name="hsc_percentage" // Done
                        label="Percentage"
                        placeholder="Enter Your HSC Percentage"
                      />
                    ) : (
                      <CustomInputNumber
                        min={0}
                        max={10}
                        control={control}
                        name="hsc_cgpa" // Done
                        label="CGPA"
                        placeholder="Enter Your HSC CGPA"
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="my-1 font-bold tracking-wide text-gray-700">Diploma Details</h2>
                <div className="flex flex-1 flex-col gap-2">
                  <div>
                    <CustomDateInput
                      name="diploma_passing_year" // Done
                      control={control}
                      picker="year"
                      label="Diploma Passing Year"
                      placeholder="Select Diploma Passing Year"
                      format={"YYYY"}
                    />
                  </div>
                  <div>
                    <CustomTextInput
                      name="diploma_branch" // Done
                      label="Branch"
                      control={control}
                      maxLength={100}
                      placeholder="Enter Your Diploma Branch"
                    />
                  </div>
                  <div>
                    <CustomRadioSelect
                      name="diploma_marking_system" // Done
                      control={control}
                      label="Marking System"
                      options={markingSystemOptions}
                    />
                  </div>
                  <div>
                    {watch("diploma_marking_system") === "Percentage" ? (
                      <CustomInputNumber
                        min={0}
                        max={100}
                        addonAfter={"%"}
                        control={control}
                        name="diploma_percentage" // Done
                        label="Percentage"
                        placeholder="Enter Your Average Diploma Percentage"
                      />
                    ) : (
                      <CustomInputNumber
                        min={0}
                        max={10}
                        control={control}
                        name="diploma_cgpa" // Done
                        label="CGPA"
                        placeholder="Enter Your Diploma Average CGPA"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* SSC Details */}
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="my-1 font-bold tracking-wide text-gray-700">S.S.C Details</h2>
            <div>
              <CustomTextInput
                name="ssc_board_name" // Done
                label="Board Name"
                control={control}
                maxLength={100}
                placeholder="State Board of Maharashtra"
              />
            </div>
            <div className="">
              <CustomDateInput
                name="ssc_passing_year" // Done
                control={control}
                picker="year"
                label="Passing Year"
                placeholder="Select SSC Passing Year"
                format={"YYYY"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <CustomRadioSelect
                  name="ssc_marking_system"
                  control={control}
                  label="Marking System"
                  options={markingSystemOptions}
                />
              </div>
              <div>
                {watch("ssc_marking_system") === "Percentage" ? (
                  <CustomInputNumber
                    min={0}
                    max={100}
                    addonAfter={"%"}
                    control={control}
                    name="ssc_percentage" // Done
                    label="Percentage"
                    placeholder="Enter Your SSC Percentage"
                  />
                ) : (
                  <CustomInputNumber
                    min={0}
                    max={10}
                    control={control}
                    name="ssc_cgpa" // Done
                    label="CGPA"
                    placeholder="Enter Your SSC CGPA"
                  />
                )}
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
      </form>
    </div>
  )
}
