const getFirst = (data) => data && Array.isArray(data) ? data[0] : null

export const normalizeLines = (lines) => {
  const [index, line] = lines
  const checkedLine = getFirst(line)

  if (!checkedLine) throw Error('Error in normalize line to upload file.')

  const splittedLine = checkedLine.split(',')

  return [index, splittedLine]
}
