const fs = require('fs');
const request = require('supertest');
const app = require('../index.js');
const agent = request.agent(app);
const logger = require('winston');
logger.cli();
logger.level = 'off';

const sampleUser = {
  id: 1,
  forename: 'Sean',
  surname: 'Timmins',
  email: 'sean.timamins@gmail.com'
};

const sampleBadUser = {
  forename: 'John',
  surname: 'Doe',
  email: 'johndoeemail.com'
};

/*
 |--------------------------------------------------------------------------
 | Users Tests
 |--------------------------------------------------------------------------
 */
describe('Users Tests', function() {

  it('Should create a new user', function(done) {

    agent.post('/api/v1/users')
      .send(sampleUser)
      .expect(201)
      .end(function(err, createUserResult) {
        if (err) return done(err);

        if (createUserResult.body.forename == sampleUser.forename &&
          createUserResult.body.surname == sampleUser.surname &&
          createUserResult.body.email == sampleUser.email) {
          return done();
        }

      });
  });

  it('Should reject creation of user with same email address twice', function(done) {
    agent.post('/api/v1/users')
      .send(sampleUser)
      .expect(403)
      .end(function(err) {
        if (err) return done(err);
        return done();
      });
  });

  it('Should reject invalid email address', function(done) {
    agent.post('/api/v1/users')
      .send(sampleBadUser)
      .expect(400)
      .end(function(err) {
        if (err) return done(err);
        return done();
      });
  });

  after(function(done) {
    fs.unlinkSync('testdb');
    done();
  });
});
