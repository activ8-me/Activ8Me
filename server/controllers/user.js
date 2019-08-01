const User = require('../models/user')
const { compareSync } = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserCont {
  static signUp(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
  }
  
  static signIn(req, res, next) {
    User.findOne({
      email: req.body.email,
    })
    .then(user => {
      if (user) {
        let isSame = compareSync(req.body.password, user.password)
        if (isSame) {
          let payload = {
            _id: user._id,
            email: user.email
          }
          let access_token = jwt.sign(payload)
          res.status(201).json({
            token: access_token
          })
        }
        else next({ code: 400, message: 'Wrong email/password' })
      }
      else
      next({ code: 400, message: 'Wrong email/password' })
    })
    .catch(next)
  }
}

module.exports = UserCont