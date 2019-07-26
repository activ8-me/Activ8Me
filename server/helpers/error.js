module.exports = (err, req, res, next) => {
  if (err.code && err.code != 500) {
    res.status(err.code).json({
      message: err.message
    })
  } 
  if (err.name == 'ValidationError') {
    let message = ''
    for (let field in err.errors) {
      message = err.errors[field].message
    }
    res.status(400).json({
      message
    })
  } 
  /* istanbul ignore next */
  else {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}