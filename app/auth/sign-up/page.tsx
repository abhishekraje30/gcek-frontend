"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import { register } from "actions/register"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomPasswordInput from "components/FormInputs/CustomPasswordInput"
import { SignUpSchema } from "configs/schemas"

export default function SignUp() {
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>("")
  const [message, setMessage] = useState<string | null>("")
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<zod.infer<typeof SignUpSchema>> = (values) => {
    setStatus("")
    setMessage("")
    startTransition(async () => {
      try {
        const response = await register(values)
        setStatus(response.status)
        setMessage(response.message)
      } catch (error: any) {
        setStatus("error")
        setMessage(error)
      }
    })
  }
  return (
    <div className="flex flex-col rounded-xl border border-gray-300 p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <h1 className="text-center">Sign Up</h1>
        <div className="flex gap-2">
          <CustomTextInput name="firstName" control={control} label="First Name" />
          <CustomTextInput name="lastName" control={control} label="Last Name" />
        </div>
        <CustomTextInput name="email" control={control} label="Email" type="email" />
        <CustomPasswordInput name="password" control={control} label="Password" />
        <CustomPasswordInput name="confirmPassword" control={control} label="Confirm Password" />
        <AlertNotification message={message} status={status} />
        <Button type="link">
          <Link href={"/auth/sign-in"}>Already a user? sign in</Link>
        </Button>
        <Button type="primary" size="large" htmlType="submit" loading={isPending}>
          Submit
        </Button>
      </form>
      <Divider style={{ borderColor: "#492971" }}>Or</Divider>
      {/* Google Button */}
      <Button
        type="default"
        size="large"
        loading={loading}
        onClick={async () => {
          setLoading(true)
          await signIn("google")
        }}
      >
        <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
        <span>Sign In with Google</span>
      </Button>
    </div>
  )
}
