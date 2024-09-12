"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import { register } from "actions/register"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomPasswordInput from "components/FormInputs/CustomPasswordInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import { ALUMINI_ROLE, SIGN_IN, STUDENT_ROLE } from "configs/constants"
import { SignUpSchema } from "configs/schemas"

export default function SignUp() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<string | null>("")
  const [message, setMessage] = useState<string | React.ReactNode>("")
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: STUDENT_ROLE,
    },
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<zod.infer<typeof SignUpSchema>> = (values) => {
    setStatus("")
    setMessage("")
    startTransition(async () => {
      const response = await register(values)
      setStatus(response.status)
      if (response.status === "success") {
        setMessage(
          <>
            <span>Account created successfully. Please </span>
            <Link href={SIGN_IN} className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </>
        )
      } else {
        if (response.message === "ExistingUser") {
          setMessage(
            <>
              <span>User already exists. Please </span>
              <Link href={SIGN_IN} className="text-blue-600 hover:underline">
                Sign in here
              </Link>
            </>
          )
        } else {
          setMessage(response.message)
        }
      }
    })
  }
  return (
    <div className="flex flex-col rounded-xl border border-gray-300 p-6 shadow-md">
      <div className="mb-2 flex justify-center">
        <Image src="/gcek logo.png" alt="Logo" width={60} height={60} priority />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <h1 className="text-center text-lg font-bold text-gray-800">Sign Up</h1>
        <div className="flex gap-2">
          <CustomTextInput name="firstName" control={control} label="First Name" />
          <CustomTextInput name="lastName" control={control} label="Last Name" />
        </div>
        <CustomTextInput name="email" control={control} label="Email" type="email" />
        <CustomPasswordInput name="password" control={control} label="Password" />
        <CustomPasswordInput name="confirmPassword" control={control} label="Confirm Password" />
        <CustomRadioSelect
          name="role"
          control={control}
          label="Are you a student or a alumni?"
          options={[
            {
              label: STUDENT_ROLE,
              value: STUDENT_ROLE,
            },
            {
              label: ALUMINI_ROLE,
              value: ALUMINI_ROLE,
            },
          ]}
        />
        <AlertNotification message={message} status={status} />
        <Button type="link">
          <Link href={SIGN_IN}>Already a user? sign in</Link>
        </Button>
        <Button type="primary" size="large" htmlType="submit" loading={isPending}>
          Submit
        </Button>
      </form>
      {/* <Divider style={{ borderColor: "#492971" }}>Or</Divider>
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
      </Button> */}
    </div>
  )
}
