"use server"
import { AxiosError } from "axios"
import { getApiClient } from "./axios-clients"

// Fetch documents
export const getData = async (url: string) => {
  const apiClient = await getApiClient()
  const response = await apiClient.get(url)
  return response.data.data
}

export const getOrCreateData = async (baseURL: string, id: string, data: any) => {
  const apiClient = await getApiClient()
  try {
    const getResponse = await apiClient.get(`${baseURL}/${id}`)
    return getResponse.data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status === 404) {
        const postResponse = await apiClient.post(baseURL, data)
        return postResponse.data.data
      }
    }
    return []
  }
}

// Create a new document
// Optimized createData function
export const createData = async (url: string, data: any): Promise<any> => {
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
