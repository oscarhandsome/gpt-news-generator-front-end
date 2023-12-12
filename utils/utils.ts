const clearObject: object = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    delete obj[key]
  })
  return obj
}

const formatDate: any = (dateISO: any, variant: number = 0) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const date = new Date(dateISO)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const monthNamesEn = monthNames[date.getMonth()]
  const monthName = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  // 10/06/2023
  if (variant === 0 || !variant) return `${day}/${month}/${year}`
  // Feb. 8, 2022
  if (variant === 1) return `${monthName} ${day}, ${year}`
  // Feb(En). 8, 2022
  if (variant === 2) return `${monthNamesEn} ${day}, ${year}`
  // Feb(En). 8, 2022 | 13:20
  if (variant === 3)
    return `${monthNamesEn} ${day}, ${year}. ${hours}:${minutes}:${seconds}`
}

export { clearObject, formatDate }
