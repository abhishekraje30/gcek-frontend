"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomInputNumber from "components/FormInputs/CustomInputNumber"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextInput from "components/FormInputs/CustomTextInput"
import { StudentAcademicDetailsSchema } from "configs/schemas"
import { useGetData } from "hooks/useCRUD"
import { getYearList } from "utils/helper"
import CustomDateRangeInput from "components/FormInputs/CustomDateRangePicker"
import { markingSystemOptions } from "configs/constants"
import CustomDateInput from "components/FormInputs/CustomDate"

const getDefaultValues = (userInfo: any) => {
  return {
    degree_branch: userInfo?.degree_branch,
    degree_duration: userInfo?.degree_duration,
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
    // const formattedData = {
    //   profile_completeness: 25,
    //   ...data,
    // }
    // try {
    //   await updateStudentProfile(formattedData)
    //   setMessage("Profile updated successfully")
    //   setStatus("success")
    // } catch (error) {
    //   console.error("Error updating profile:", error)
    //   setLoading(false)
    //   setMessage("Error updating profile")
    //   setStatus("error")
    // }
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
                required
                placeholder="Select Your Degree Branch"
                options={branchOptions}
              />
            </div>
            <div className="">
              <CustomDateRangeInput
                control={control}
                name="degree_duration" // Done
                required
                label="Degree Duration"
                picker="year"
                placeholder={["Degree Start Year", "Degree End Year"]}
                format={"YYYY"}
              />
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
                    required
                  />
                ) : (
                  <CustomInputNumber
                    min={0}
                    max={10}
                    control={control}
                    name="degree_cgpa" // Done
                    label="CGPA"
                    placeholder="Enter Your Degree Average CGPA"
                    required
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
                    required
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
                    required
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
                        required
                      />
                    ) : (
                      <CustomInputNumber
                        min={0}
                        max={10}
                        control={control}
                        name="hsc_cgpa" // Done
                        label="CGPA"
                        placeholder="Enter Your HSC CGPA"
                        required
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
                      required
                    />
                  </div>
                  <div>
                    <CustomTextInput
                      name="diploma_branch" // Done
                      label="Branch"
                      control={control}
                      maxLength={100}
                      required
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
                        required
                      />
                    ) : (
                      <CustomInputNumber
                        min={0}
                        max={10}
                        control={control}
                        name="diploma_cgpa" // Done
                        label="CGPA"
                        placeholder="Enter Your Diploma Average CGPA"
                        required
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
                name="ssc_board"
                label="Board Name"
                control={control}
                maxLength={100}
                placeholder="State Board of Maharashtra"
              />
            </div>
            <div className="">
              <CustomSingleSelect
                name="ssc_passing_year"
                control={control}
                label="Passing Year"
                placeholder="Select Passing Year"
                required
                options={getYearList()}
              />
            </div>
            <div>
              <div>
                <CustomRadioSelect
                  name="ssc_percentage_or_cgpa"
                  control={control}
                  label="Marking System"
                  options={[
                    {
                      label: "Percentage",
                      value: "Percentage",
                    },
                    {
                      label: "CGPA",
                      value: "CGPA",
                    },
                  ]}
                />
              </div>
              <div>
                {watch("ssc_percentage_or_cgpa") === "Percentage" ? (
                  <CustomInputNumber
                    min={0}
                    max={100}
                    addonAfter={"%"}
                    control={control}
                    name="percentage"
                    label="Percentage"
                  />
                ) : (
                  <CustomInputNumber min={0} max={10} control={control} name="cgpa" label="CGPA" />
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
