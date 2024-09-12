import { useSession } from "next-auth/react"

export const useCurrentUser = () => {
  const session = useSession()

  return session.data?.userInfo
}

export const useGetCurrentUserRole = () => {
  const session = useSession()
  const roles = session.data?.userInfo?.roles
  return roles.map((role: any) => role.role)
}
