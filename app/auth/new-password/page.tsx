"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { verifyToken } from "actions/verification-token"
import NewPassword from "components/NewPassword"
import Loader from "components/Loader"

export default function ChangePassword() {
  const [validToken, setValidToken] = useState(false)
  const [email, setEmail] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get("token")
    if (!token) {
      router.push("/unauthorized")
      return
    }

    ;(async () => {
      try {
        const { valid, email } = await verifyToken(token)

        if (!valid) {
          router.push("/unauthorized")
        }
        setValidToken(true)
        setEmail(email)
      } catch (error) {
        console.error("Error in resetting new password:", error)
        router.push("/unauthorized")
      }
    })()
  }, [searchParams, router])

  return <div>{validToken ? <NewPassword email={email} /> : <Loader />}</div>
}
