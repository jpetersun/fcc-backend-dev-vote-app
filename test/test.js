import 'babel-polyfill'

const app = require('../app')
const request = require('supertest')
const expect = require('chai').expect
const User = require('../js/models/user')

// Fake authentication
app.request.isAuthenticated = function() {
  return true
}

describe('[USERS]', function(){
  let testUser = {}
  before((done) => {
    console.log('Creating Test User')
    const searchQuery = {
      name: 'Test Dude'
    }

    const updates = {
      name: 'Test Dude',
      someID: '12345',
      avatar: 'https://cdn.pixabay.com/photo/2017/04/08/04/53/coffee-2212479_960_720.jpg'
    }

    const options = {
      upsert: true
    }
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err)
      } else {
        return done(null, user)
      }
    })
    const testUserQuery = User.findOne({ someID: '12345'})
    testUserQuery.then((user) => {
      testUser = user
      // console.log(user)
    })
  })

  it('should get all users', function(done) {
    request(app)
      .get('/polls')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        // console.log(res.body)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should create a poll', function(done) {
    request(app)
      .post('/create-poll')
      .send({
        user: {
          _id: testUser._id,
        },
        name: 'Cats',
        values: ['lion', 'cub', 'cheetah']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        // console.log(res.body)
        expect(res.body).not.to.be.empty
        done()
      })
  })

  it('should delete a poll', function(done) {
    const testUserQuery = User.findOne({ someID: '12345'})
    request(app)
      .post('/create-poll')
      .send({
        user: {
          _id: testUser._id,
        },
        name: 'Doggs',
        values: ['labs', 'retrievers', 'healer']
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        testUserQuery.then(user => {
          // console.log(user)
          request(app)
            .delete(`/user-poll/${user._id}/${user.polls[0]._id}`)
            .end(function(err, res) {
              expect(res.body[0]).to.be.an('object')
              expect(res.body[0].name).to.eql('Doggs')
              done()
          })
        })
      })
  })

  it('should update a poll', function(done) {
    const testUserQuery = User.findOne({ someID: '12345'})
    request(app)
      .post('/create-poll')
      .send({
        user: {
          _id: testUser._id,
        },
        name: 'Vegitables',
        values: ['carerot', 'doneion', 'chabbage']
      })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        testUserQuery.then(user => {
          // console.log(user.polls[1].options)
          // console.log(user.polls[1].options[0]._id)
          request(app)
            .put(`/poll-results/${user._id}/${user.polls[1]._id}`)
            .send({
              name: 'carerot',
              _id: user.polls[0].options[0]._id
            })
            .end(function(err, res) {
              expect(res.body.votes).to.equal(1)
              done()
            })
        })
      })
  })

  after(() => {
    console.log('Deleting Test User')
    User.find().remove({ someID: '12345' }).exec()
  })
})
