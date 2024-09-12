import { Button, Result } from "antd"
import Link from "next/link"

export default function Unauthorised() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link href="/">Back Home</Link>
        </Button>
      }
    />
  )
}
