import axios from "axios"

export const apiClient = axios.create({
  baseURL: process.env.FRAPPE_BASE_URL,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
})

export const adminApiClient = axios.create({
  baseURL: process.env.FRAPPE_BASE_URL,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${process.env.FRAPPE_ADMIN_AUTH_KEY}:${process.env.FRAPPE_ADMIN_AUTH_SECRET}`,
  },
})
