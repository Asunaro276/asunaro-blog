export const convertDateFormat = (date: string) => {
  const date_converted = date.split("-")
  console.log(date_converted)
  return `${date_converted[0]}.${date_converted[1]}.${date_converted[2].split("T")[0]}`
}