"use client"
import { useGetData } from "./useCRUD"

const createDropdownOptions = (data: any, dropdownKey: string) => {
  if (!data) return []
  return data.map((item: any) => {
    return {
      ...item,
      value: item[dropdownKey],
      label: item[dropdownKey],
    }
  })
}

export const useDropdownOptions = (url: string, dropdownKey: string) => {
  const { data, error, isLoading } = useGetData(url)
  const dropdownOptions = createDropdownOptions(data, dropdownKey)
  if (error) {
    console.log(`dropdownOptionsError: ${url}: ${error}`)
  }

  return { dropdownOptions, error, isLoading }
}
