import { GetProps, Input } from "antd"
import { Control, Controller } from "react-hook-form"

interface OTPProps extends GetProps<typeof Input.OTP> {
  control: Control<any>
  name: string
  label: string
  size?: "small" | "large"
  required?: boolean
}

export default function CustomOTPInput({ control, name, label, required, ...props }: OTPProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name} className="text-sm font-semibold">
            {required ? (
              <span>
                {label} <span className="text-red-500">*</span>
              </span>
            ) : (
              label
            )}
          </label>
          <Input.OTP {...field} {...props} status={fieldState.error && "error"} />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
