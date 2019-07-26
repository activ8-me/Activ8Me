const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Alarm = require('../models/alarm')
const moment = require('moment')

chai.use(chaiHttp)
chai.should()

after(function(done) {
  function clearAlarm (done) {
    if (process.env.NODE_ENV === 'test') {
      Alarm
        .deleteMany({})
        .then(function() {
          console.log('Clear alarm testing database')
          done();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };
  clearAlarm(done);
});

let accessToken, unauthorizeToken
const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDEwY2MxYzk5YjZlMTRjMWI0MWU0MmEiLCJlbWFpbCI6ImhhaGFAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.-MY2HYrdbVxhRfQ1EBpLF3Tjw-RKi2UkdKAxt2PKCOI"
const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsIWlsIjoidXNlckB0ZXN0LmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.QrZ5a9QoubRSSltG9e-TFrgG1Bco3Cck7Q_ayk-Fj00"
let idAlarm

describe('Successfull Sign In user', function () {
  it('Sign In User', function (done) {
    chai
      .request(app)
      .post('/user/signIn')
      .send({
        email: 'test@test.com',
        password: '12345678'
      })
      .then(res => {
        accessToken = res.body.token
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})

describe('Successfull Sign Up & Sign in unauthorize user', function () {
  it('Sign Up Unauthorize User', function (done) {
    chai
      .request(app)
      .post('/user/signUp')
      .send({
        email: 'test2@test.com',
        password: '12345678'
      })
      .then(res => {
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
  it('Sign In Unauthorize User', function (done) {
    chai
      .request(app)
      .post('/user/signIn')
      .send({
        email: 'test2@test.com',
        password: '12345678'
      })
      .then(res => {
        unauthorizeToken = res.body.token
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})

describe('Testing Alarm Server Endpoint', function () {
  describe('Test Create Alarm Endpoint', function () {
    describe('POST /alarm/create', function () {
      let time = moment().format('LN')
      describe('Successfull create alarm', function () {
        it('Should return an object with status code 201', function (done) {
          chai
            .request(app)
            .post('/alarm/create')
            .set('token', `${accessToken}`)
            .send({
              title: "Test",
              time: time,
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            })
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('_id')
              res.body.should.be.have.property('time')
              res.body.should.be.have.property('days')
              res.body.should.be.have.property('originTime')
              res.body.should.be.have.property('user')
              res.body.time.should.equal(time)
              res.body.originTime.should.equal(time)
              res.should.have.status(201)
              idAlarm = res.body._id
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail create alarm without access token', function () {
        it('Should return an error with status code 401 and message: "Please login first!"', function (done) {
          chai
            .request(app)
            .post('/alarm/create')
            // .set('token', `${accessToken}`)
            .send({
              title: "Test",
              time: time,
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            })
            .then(res => {
              res.body.message.should.equal('Please login first!')
              res.should.have.status(401)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail create alarm with wrong access token', function () {
        it('Should return an error with status code 404 and message: "User not found!"', function (done) {
          chai
            .request(app)
            .post('/alarm/create')
            .set('token', `${wrongToken}`)
            .send({
              title: "Test",
              time: time,
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              originTime: time
            })
            .then(res => {
              res.body.message.should.equal('User not found!')
              res.should.have.status(404)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail create alarm with invalid access token', function () {
        it('Should return an error with status code 400 and message: "Invalid Token"', function (done) {
          chai
            .request(app)
            .post('/alarm/create')
            .set('token', `${invalidToken}`)
            .send({
              title: "Test",
              time: time,
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              originTime: time
            })
            .then(res => {
              res.body.message.should.equal('Invalid Token')
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
  describe('Test Read Alarm Endpoint', function () {
    describe('GET /alarm/list', function () {
      describe('Successfull get alarm list', function () {
        it('Should return an array with status code 200', function (done) {
          chai
            .request(app)
            .get('/alarm/list')
            .set('token', `${accessToken}`)
            .then(res => {
              res.body.should.be.an('array')
              res.should.have.status(200)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    })
  })
  describe('Test Update Alarm Endpoint', function () {
    describe('PATCH /alarm/update/:id', function () {
      let updateTime = moment().add(10, "minutes").format("LN")
      describe('Successfull update alarm type snooze', function () {
        it('Should return an object with status code 200', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .set('token', `${accessToken}`)
            .send({
              time: updateTime,
              type: 'snooze'
            })
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('_id')
              res.body.should.be.have.property('time')
              res.body.should.be.have.property('days')
              res.body.should.be.have.property('originTime')
              res.body.should.be.have.property('user')
              res.body.time.should.equal(updateTime)
              res.should.have.status(201)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Successfull update alarm type reset', function () {
        it('Should return an object with status code 200', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .set('token', `${accessToken}`)
            .send({
              type: 'reset'
            })
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('_id')
              res.body.should.be.have.property('time')
              res.body.should.be.have.property('days')
              res.body.should.be.have.property('originTime')
              res.body.should.be.have.property('user')
              res.body.time.should.equal(res.body.originTime)
              res.should.have.status(201)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Successfull update alarm type update', function () {
        it('Should return an object with status code 200', function (done) {
          let time = moment().format('LN')
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .set('token', `${accessToken}`)
            .send({
              title: "Test",
              time: time,
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              type: 'update'
            })
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('_id')
              res.body.should.be.have.property('time')
              res.body.should.be.have.property('days')
              res.body.should.be.have.property('originTime')
              res.body.should.be.have.property('user')
              res.body.time.should.equal(updateTime)
              res.should.have.status(201)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail update alarm with wrong id', function () {
        it('Should return an error with status code 404 and message: "Alarm with id 5d0cebd686ef101a48b134dd not found!"', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/5d0cebd686ef101a48b134dd`)
            .set('token', `${accessToken}`)
            .send({
              time: updateTime,
              type: 'snooze'
            })
            .then(res => {
              res.body.message.should.equal('Alarm with id 5d0cebd686ef101a48b134dd not found!')
              res.should.have.status(404)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail update alarm without access token', function () {
        it('Should return an error with status code 401 and message: "Please login first!"', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .send({
              time: updateTime,
              type: 'snooze'
            })
            // .set('token', `${accessToken}`)
            .then(res => {
              res.body.message.should.equal('Please login first!')
              res.should.have.status(401)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail update alarm with wrong access token', function () {
        it('Should return an error with status code 404 and message: "User not found!"', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .send({
              time: updateTime,
              type: 'snooze'
            })
            .set('token', `${wrongToken}`)
            .then(res => {
              res.body.message.should.equal('User not found!')
              res.should.have.status(404)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail update alarm with invalid access token', function () {
        it('Should return an error with status code 400 and message: "Invalid Token"', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .send({
              time: updateTime,
              type: 'snooze'
            })
            .set('token', `${invalidToken}`)
            .then(res => {
              res.body.message.should.equal('Invalid Token')
              res.should.have.status(400)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
      describe('Fail update alarm with unauthorize access token', function () {
        it('Should return an error with status code 403 and message: "Unauthorized"', function (done) {
          chai
            .request(app)
            .patch(`/alarm/update/${idAlarm}`)
            .send({
              time: updateTime,
              type: 'snooze'
            })
            .set('token', `${unauthorizeToken}`)
            .then(res => {
              res.body.message.should.equal('Unauthorized')
              res.should.have.status(403)
              done()
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    })
  })
  describe('Test Delete Alarm Endpoint', function () {
    describe('DELETE /alarm/delete/:id', function () {
      describe('Fail delete alarm with wrong alarm id', function () {
        it('Should return an error with status code 404 and message: "Alarm with id 5d0cebd686ef401a48b134dd not found!"', function (done) {
          chai
            .request(app)
            .delete(`/alarm/delete/5d0cebd686ef401a48b134dd`)
            .set('token', `${accessToken}`)
            .then(res => {
              res.body.message.should.equal('Alarm with id 5d0cebd686ef401a48b134dd not found!')
              res.should.have.status(404)
              done()
            })
            .catch(err => {
              console.log(err);
            })
        })
      })
      describe('Fail delete alarm without access token', function () {
        it('Should return an error with status code 401 and message: "Please login first!"', function (done) {
          chai
            .request(app)
            .delete(`/alarm/delete/${idAlarm}`)
            // .set('token', `${accessToken}`)
            .then(res => {
              res.body.message.should.equal('Please login first!')
              res.should.have.status(401)
              done()
            })
            .catch(err => {
              console.log(err);
            })
        })
      })
      describe('Fail delete alarm with wrong access token', function () {
        it('Should return an error with status code 404 and message: "User not found!"', function (done) {
          chai
            .request(app)
            .delete(`/alarm/delete/${idAlarm}`)
            .set('token', `${wrongToken}`)
            .then(res => {
              res.body.message.should.equal('User not found!')
              res.should.have.status(404)
              done()
            })
            .catch(err => {
              console.log(err);
            })
        })
      })
      describe('Fail delete alarm with invalid access token', function () {
        it('Should return an error with status code 400 and message: "Invalid Token"', function (done) {
          chai
            .request(app)
            .delete(`/alarm/delete/${idAlarm}`)
            .set('token', `${invalidToken}`)
            .then(res => {
              res.body.message.should.equal('Invalid Token')
              res.should.have.status(400)
              done()
            })
            .catch(err => {
              console.log(err);
            })
        })
      })
      describe('Fail delete alarm with unauthorize access token', function () {
        it('Should return an error with status code 403 and message: "Unauthorized"', function (done) {
          chai
            .request(app)
            .delete(`/alarm/delete/${idAlarm}`)
            .set('token', `${unauthorizeToken}`)
            .then(res => {
              res.body.message.should.equal('Unauthorized')
              res.should.have.status(403)
              done()
            })
            .catch(err => {
              console.log(err);
            })
        })
      })
      describe('Successfull delete alarm', function () {
        it('Should return an object with status code 200', function (done) {
          chai
            .request(app)
            .delete(`/alarm/delete/${idAlarm}`)
            .set('token', `${accessToken}`)
            .then(res => {
              res.body.should.be.an('object')
              res.body.should.be.have.property('deletedCount')
              res.body.deletedCount.should.equal(1)
              res.should.have.status(200)
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