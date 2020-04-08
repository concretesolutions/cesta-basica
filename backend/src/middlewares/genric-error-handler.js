export function genericErrorHanlder (error, req, res, next) {
  console.error(error)
  const code = error.name === 'ValidationError' ? 400 : error.statusCode || 500
  res.status(code).json({ message: error && error.message ? error.message : 'internal' })
}
