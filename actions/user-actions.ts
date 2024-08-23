"use server"
import { getApiClient } from "./frappe-key-secret"

export const getUsers = async () => {
  const apiClient = await getApiClient()

  const response = await apiClient.get(`/document/User?fields=["*"]`)
  if (response.status === 200) {
    return response.data.data
  }

  return []
}
