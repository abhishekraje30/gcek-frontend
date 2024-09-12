import { Result } from "antd"

export default function Unverified() {
  return (
    <Result
      status="warning"
      title="Your account is not verified yet."
      subTitle="Please check your email for the verification link."
    />
  )
}
