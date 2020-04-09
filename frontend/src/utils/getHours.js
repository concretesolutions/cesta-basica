export function getHour(date) {
  const dateInStream = new Date(date)
  return `${dateInStream.getHours()}h${dateInStream.getMinutes()}`
}
