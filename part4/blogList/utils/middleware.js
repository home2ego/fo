const errorHandler = (err, _req, res, _next) => {
  console.log(err.name, err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  res.status(500).json({ error: 'internal server error' })
}

module.exports = { errorHandler }
