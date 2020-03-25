export function password () {
  return Math.round(Math.random() * 1000000000000).toString().slice(0, 8)
}
