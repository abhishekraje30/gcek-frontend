"use client"
import { Input, InputProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface InputFieldProps extends InputProps {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  placeholder?: string
  required?: boolean
}

export default function CustomTextAreaInput({
  control,
  name,
  label,
  placeholder,
  rows,
  required = false,
  ...props
}: any) {
  const { TextArea } = Input
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
          <TextArea {...field} {...props} rows={rows} placeholder={placeholder} status={fieldState.error && "error"} />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
