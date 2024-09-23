"use client"
import { Button, Result } from "antd"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { verifyAccount } from "actions/verification-token"
import { SIGN_IN, UNAUTHORIZED } from "configs/constants"
import Loader from "../../../components/Loader"

export default function VerifyAccount() {
  const [validToken, setValidToken] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const token = searchParams.get("token")
    if (!token) {
      router.push(UNAUTHORIZED)
      return
    }

    ;(async () => {
      try {
        const { valid } = await verifyAccount(token)

        if (!valid) {
          router.push(UNAUTHORIZED)
        }
        setValidToken(true)
      } catch (error) {
        router.push(UNAUTHORIZED)
      }
    })()
    setLoading(false)
  }, [searchParams, router])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {validToken ? (
        <Result
          status="success"
          title="Account verified successfully"
          extra={[
            <Link href={SIGN_IN} key="console">
              <Button type="primary">Go to Sign In</Button>
            </Link>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Account verification failed"
          subTitle="Please check your email for the verification link"
        />
      )}
    </div>
  )
}
