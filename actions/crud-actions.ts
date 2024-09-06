"use server"
import { getApiClient } from "./axios-clients"

// Fetch documents
export const getData = async (url: string) => {
  const apiClient = await getApiClient()
  const response = await apiClient.get(url)
  return response.data.data
}

// Create a new document
export const createData = async (url: string, data: any) => {
  const apiClient = await getApiClient()
  const response = await apiClient.post(url, data)
  return response.data.data
}

// Update an existing document
export const updateData = async (url: string, data: any) => {
  const apiClient = await getApiClient()
  const response = await apiClient.put(url, data)
  return response.data.data
}

// Delete a document
export const deleteData = async (url: string) => {
  const apiClient = await getApiClient()
  await apiClient.delete(url)
}
