"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import AlertNotification from "components/AlertNotification"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomPasswordInput from "components/FormInputs/CustomPasswordInput"
import { SignInSchema } from "configs/schemas"

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>("")
  const [message, setMessage] = useState<string | null>("")
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<zod.infer<typeof SignInSchema>> = async (values) => {
    setStatus("")
    setMessage("")
    setIsPending(true)

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (!signInData?.error) {
      // If no error then redirect to the desired page
      router.push("/")
    } else {
      let message = ""
      switch (signInData?.error) {
        case "CredentialsSignin":
          message = "Invalid email or password"
          break
        case "Configuration":
          message = "Email does not exist. Please sign up."
          setIsPending(false)
          break
        default:
          message = "An error occurred. Please try again."
      }
      setStatus("error")
      setMessage(message)
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-300 p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <h1 className="text-center">Sign In</h1>
        <CustomTextInput name="email" control={control} label="Email" type="email" />
        <CustomPasswordInput name="password" control={control} label="Password" />
        <AlertNotification message={message} status={status} />
        <Button type="primary" size="large" htmlType="submit" loading={isPending}>
          Submit
        </Button>
        <Button type="link">
          <Link href={"/auth/sign-up"}>New to Site? Create account</Link>
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
          await signIn("google", { callbackUrl: "/" })
        }}
      >
        <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
        <span>Sign In with Google</span>
      </Button>
    </div>
  )
}
