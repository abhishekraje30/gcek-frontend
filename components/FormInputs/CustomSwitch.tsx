"use client"
import { Switch, SwitchProps } from "antd"
import { Control, Controller } from "react-hook-form"

interface CustomSwitchProps extends SwitchProps {
  control: Control<any>
  name: string
  label: string
  size?: "small"
  defaultChecked?: boolean
  onChange?: (value: any) => void
  required?: boolean
}

export default function CustomSwitch({ control, name, label, required, onChange, ...props }: CustomSwitchProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={name} className="block text-sm  font-semibold">
            {required ? (
              <span>
                {label} <span className="text-red-500">*</span>
              </span>
            ) : (
              label
            )}
          </label>
          <Switch
            {...field}
            {...props}
            className="!w-fit"
            onChange={(value) => {
              field.onChange(value)
              if (onChange) onChange(value)
            }}
          />

          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
