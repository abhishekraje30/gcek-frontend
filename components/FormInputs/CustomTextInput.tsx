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

export default function CustomTextInput({
  control,
  name,
  label,
  placeholder,
  required = false,
  ...props
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label htmlFor={name} className="text-sm font-semibold">
            {required ? (
              <span>
                {label} <span className="text-red-500">*</span>
              </span>
            ) : (
              label
            )}
          </label>
          <Input {...field} {...props} placeholder={placeholder} status={fieldState.error && "error"} />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
