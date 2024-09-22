"use client"
import { DatePicker, DatePickerProps } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { Control, Controller } from "react-hook-form"

interface DateFieldProps extends DatePickerProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
  required?: boolean
}

export default function CustomDateInput({
  control,
  name,
  label,
  placeholder,
  required = false,
  ...props
}: DateFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="block text-sm">
            {required ? (
              <span>
                {label} <span className="text-red-500">*</span>
              </span>
            ) : (
              label
            )}
          </label>
          <DatePicker
            {...field}
            {...props}
            placeholder={placeholder}
            value={field.value ? dayjs(field.value) : null} // Convert Date to Dayjs for the DatePicker
            onChange={(date: Dayjs) => field.onChange(date ? date.toDate() : null)} // Convert Dayjs to Date for React Hook Form
            status={fieldState.error && "error"}
            className="!w-full"
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
