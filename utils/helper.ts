export const getYearList = () => {
  const currentYear = new Date().getFullYear()
  const yearList = []
  for (let i = currentYear - 8; i <= currentYear + 8; i++) {
    yearList.push({ label: i.toString(), value: i.toString() })
  }
  return yearList
}

export const getAluminiYearList = () => {
  const currentYear = new Date().getFullYear()
  const yearList = []
  for (let i = currentYear - 64; i <= currentYear - 1; i++) {
    yearList.push({ label: i.toString(), value: i.toString() })
  }
  return yearList
}
