const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const clearUser = require('../helpers/delete-user-test')

chai.use(chaiHttp)
chai.should()

after(function(done) {
  function clearUser (done) {
    if (process.env.NODE_ENV === 'test') {
      User
        .deleteMany({})
        .then(function() {
          console.log('Clear user testing database')
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };
  clearUser(done);
});

describe('Testing User Server Endpoint', function () {
  describe('Test Sign Up User Endpoint', function () {
    describe('POST /user/signUp', function () {
      describe('Successfull Sign Up user', function () {
        it('Should return an object with status code 201', function (done) {
          chai
            .request(app)
            .post('/user/signUp')
            .send({
              email: 'test@test.com',
              password: '12345678'
            })
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('_id')
              res.body.should.be.have.property('email')
              res.body.should.be.have.property('password')
              res.body.email.should.equal('test@test.com')
              res.body.password.should.not.equal('12345678')
              res.should.have.status(201)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail Sign Up with invalid email format', function () {
        it('Should return an error validation with status code 400 and message: "test@com is not a valid email!"', function (done) {
          chai
            .request(app)
            .post('/user/sigUp')
            .send({
              email: 'test@com',
              password: '12345678'
            })
            .then(res => {
              res.body.message.should.equal('test@com is not a valid email!')
              res.should.have.status(400)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail Sign Up with registered email', function () {
        it('Should return an error validation with status code 400 and message: "test@test.com has been registered!"', function (done) {
          chai
            .request(app)
            .post('/user/signUp')
            .send({
              email: 'test@test.com',
              password: '12345678'
            })
            .then(res => {
              res.body.message.should.equal('test@test.com has been registered!')
              res.should.have.status(400)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    })
  })
  describe('Test Sign In User Endpoint', function () {
    describe('POST /user/signIn', function () {
      describe('Successfull Sign In', function () {
        it('Should return an object with status code 200', function (done) {
          chai
            .request(app)
            .post('/user/signIn')
            .send({
              email: 'test@test.com',
              password: '12345678'
            })
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('access_token')
              res.should.have.status(200)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail Sign In with wrong email', function () {
        it('Should return an error with status code 400 and message: "Wrong email/password"', function (done) {
          chai
            .request(app)
            .post('/user/signIn')
            .send({
              email: 'test@test.co',
              password: '12345678'
            })
            .then(res => {
              res.body.message.should.equal('Wrong email/password')
              res.should.have.status(400)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail Sign In with wrong password', function () {
        it('Should return an error with status code 400 and message: "Wrong email/password"', function (done) {
          chai
            .request(app)
            .post('/user/signIn')
            .send({
              email: 'test@test.com',
              password: '123456789'
            })
            .then(res => {
              res.body.message.should.equal('Wrong email/password')
              res.should.have.status(400)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    })
  })
})