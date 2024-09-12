"use server"

import { getApiClient } from "./axios-clients"

export const getUsers = async () => {
  const apiClient = await getApiClient()

  const response = await apiClient.get(`/document/User?fields=["*"]`)
  if (response.status === 200) {
    return response.data.data
  }

  return []
}

export const getUser = async (userId: string) => {
  const apiClient = await getApiClient()

  const response = await apiClient.get(`/document/User/${userId}`)
  if (response.status === 200) {
    return response.data.data
  }

  return {}
}

export const fetcher = async (url: string) => {
  try {
    const apiClient = await getApiClient()
    const response = await apiClient.get(url)
    return response.data
  } catch (error) {
    throw error
  }
}
