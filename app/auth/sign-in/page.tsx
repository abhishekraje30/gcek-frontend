"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
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
import Loader from "components/Loader"
import { RESET_PASSWORD, SIGN_UP } from "configs/constants"
import { SignInSchema } from "configs/schemas"

export default function SignIn() {
  const [globalLoading, setGlobalLoading] = useState(false)
  const [status, setStatus] = useState<string | null>("")
  const [message, setMessage] = useState<string | React.ReactNode>("")
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
      let message: string | React.ReactNode = ""
      switch (signInData?.error) {
        case "CredentialsSignin":
          message = "Invalid email or password"
          setIsPending(false)
          break
        case "Configuration":
          message = (
            <>
              <span>Account does not exist. Please </span>
              <Link href={SIGN_UP} className="text-blue-600 hover:underline">
                create account here
              </Link>
            </>
          )

          setIsPending(false)
          break
        default:
          message = "An error occurred. Please try again."
          setIsPending(false)
      }
      setStatus("error")
      setMessage(message)
    }
  }

  if (globalLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-300 p-6 shadow-md">
      <div className="mb-2 flex justify-center">
        <Image src="/gcek logo.png" alt="Logo" width={60} height={60} priority />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-lg font-bold text-gray-800">Sign In</h1>
          <CustomTextInput name="email" control={control} label="Email" type="email" />
          <CustomPasswordInput name="password" control={control} label="Password" />
        </div>

        <div
          className="mb-2 mt-1 cursor-pointer text-right text-xs text-blue-500 hover:text-blue-600 hover:underline"
          onClick={() => {
            setGlobalLoading(true)
            router.push(RESET_PASSWORD)
            setGlobalLoading(false)
          }}
        >
          Forgot password?
        </div>
        <div className="flex flex-col gap-2">
          <AlertNotification message={message} status={status} />
          <Button type="primary" size="large" htmlType="submit" loading={isPending}>
            Submit
          </Button>
          <Button type="link">
            <Link href={SIGN_UP}>New to Site? Create account</Link>
          </Button>
        </div>
      </form>
      {/* <Divider style={{ borderColor: "#492971" }}>Or</Divider>
      <h3 className="text-center text-sm text-gray-500">Are you a student or alumini?</h3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 justify-center">
          <Radio.Group onChange={(e: RadioChangeEvent) => setRole(e.target.value)} value={role}>
            <Radio value={"Student"}>Student</Radio>
            <Radio value={"Alumini"}>Alumini</Radio>
          </Radio.Group>
        </div>

        <div className="flex-1">
          <Button
            className="!w-full"
            type="default"
            size="large"
            loading={loading}
            onClick={async () => {
              setLoading(true)
              await signIn("google", { callbackUrl: "/", state: JSON.stringify({ role }) })
            }}
          >
            <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
            <span>Sign In with Google</span>
          </Button>
        </div>
      </div> */}
    </div>
  )
}
