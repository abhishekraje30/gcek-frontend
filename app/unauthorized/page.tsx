import { Button, Result } from "antd"
import Link from "next/link"
import { HOME_ROUTE } from "configs/constants"

export default function Unauthorised() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link href={HOME_ROUTE}>Back Home</Link>
        </Button>
      }
    />
  )
}
