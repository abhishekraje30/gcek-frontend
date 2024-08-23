"use server"
import { auth } from "auth"
import { apiClient } from "configs/axios"

export const getFrappeToken = async () => {
  const session = await auth()
  if (session && session.userInfo) {
    return `token ${session.userInfo.api_key}:${session.userInfo.api_secret}`
  }
  return ""
}

export const getApiClient = async () => {
  const token = await getFrappeToken()
  apiClient.defaults.headers.common["Authorization"] = token
  return apiClient
}
