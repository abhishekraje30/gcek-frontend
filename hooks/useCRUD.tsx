import useSWR, { mutate } from "swr"
import { createData, deleteData, getData, updateData } from "actions/crud-actions"

// Hook for reading documents
export const useGetData = (url: string) => {
  const { data, error, isLoading } = useSWR(url, getData)

  return { data, error, isLoading }
}

// Hook for creating a document
export const useCreateData = (url: string) => {
  const create = async (createObject: any) => {
    try {
      // Optimistically update the cache
      mutate(url, createObject, false)
      // Make the POST request
      await createData(url, createObject)
      // Revalidate the cache
      mutate(url)
    } catch (error) {
      console.error("Error while creating object:", error)
    }
  }

  return { create }
}

// Hook for updating a document
export const useUpdateData = (url: string) => {
  const update = async (updateObject: any) => {
    try {
      // Optimistically update the cache
      mutate(url, updateObject, false)
      // Make the PUT request
      await updateData(url, updateObject)
      // Revalidate the cache
      mutate(url)
    } catch (error) {
      throw error
    }
  }

  return { update }
}

// Hook for deleting a document
export const useDeleteData = (url: string) => {
  const remove = async () => {
    try {
      // Make the DELETE request
      await deleteData(url)
      // Revalidate the cache
      mutate(url)
    } catch (error) {
      console.error("Error deleting document:", error)
    }
  }

  return { remove }
}
