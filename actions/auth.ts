import { auth } from "../auth"

export const currentUser = async () => {
  const session = await auth()
  return session?.user
}

export const currentUserRole = async () => {
  const session = await auth()
  const roles = session?.userInfo?.roles
  return roles.map((role: any) => role.role)
}
