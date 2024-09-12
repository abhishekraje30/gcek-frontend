export const convertToFrappeDatetime = (datetime: Date): string => {
  // Extract each component separately
  const year = datetime.getFullYear()
  const month = String(datetime.getMonth() + 1).padStart(2, "0") // getMonth() returns 0-indexed months
  const day = String(datetime.getDate()).padStart(2, "0")
  const hours = String(datetime.getHours()).padStart(2, "0")
  const minutes = String(datetime.getMinutes()).padStart(2, "0")
  const seconds = String(datetime.getSeconds()).padStart(2, "0")

  // Form the date string in 'YYYY-MM-DD HH:MM:SS' format
  const expiresDate = `${year}-${month}-${day}`
  const expiresTime = `${hours}:${minutes}:${seconds}`
  const expires = `${expiresDate} ${expiresTime}`
  return expires
}
