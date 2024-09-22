"use client"
import { DatePicker } from "antd"
import { Controller } from "react-hook-form"

const { RangePicker } = DatePicker

export default function CustomDateRangeInput({ control, name, label, required, ...props }: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm">
            {required ? (
              <span>
                {label} <span className="text-red-500">*</span>
              </span>
            ) : (
              label
            )}
          </label>
          <RangePicker className="!w-full" {...field} {...props} />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
