export const getFrappeDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const getFrappeTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export const convertToFrappeDatetime = (datetime: Date): string => {
  const expiresDate = getFrappeDate(datetime)
  const expiresTime = getFrappeTime(datetime)
  const expires = `${expiresDate} ${expiresTime}`
  return expires
}
