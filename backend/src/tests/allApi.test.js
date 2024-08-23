// Test suite for the API tests
/* eslint-disable */
import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';

// API tests
describe('API Tests', () => {
  let mongoServer;
  let token; // Token to be used for authenticated requests
  let createdDogId; // To store a created dog's ID for retrieval and deletion
  let username = 'testuser'; // Username to be used for user profile tests

  before(async function () {
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'w4ll4b13s732c0mpsc12024';
    this.timeout(10000); // Extended timeout for database setup
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // User registration test
  it('should register a new user', function (done) {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: '123456',
        confirmPassword: '123456',
        email: 'test@example.com',
        aboutMe: 'I am a test user.',
        address: '123 Test St',
        latitude: 40.7128,
        longitude: -74.006,
        phone: '123-456-7890'
      })
      .expect(201)
      .end((err, res) => {
        if (err || res.status !== 201) {
          console.error('Auth API failed:', res.body);
          return done(new Error('Failed to register user'));
        }
        expect(res.body).to.have.property('user');
        done(); // End the registration test
      });
  });

  // User login test
  it('should login a user', function (done) {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: '123456'
      })
      .expect(200)
      .end((err, res) => {
        if (err || res.status !== 200) {
          console.error('Auth API failed:', res.body);
          return done(new Error('Failed to test correct login user'));
        }
        expect(res.body).to.be.an('object');
        token = res.body.token;
        done();
      });
  });

  // User login test with wrong password
  it('should not login with wrong password', function (done) {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err || res.status !== 400) {
          console.error('Auth API failed:', res.body);
          return done(new Error('Failed to test wrong password login user'));
        }
        expect(res.body).to.include({ message: 'Invalid credentials' });
        done();
      });
  });

  // Update a user profile
  it('should update a user', (done) => {
    request(app)
      .put(`/api/user/${username}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: username,
        email: 'testupdate@example.com',
        aboutMe: 'I am a test user.',
        address: '123 Test St',
        latitude: 40.7128,
        longitude: -74.006,
        phone: '123-456-7890'
      })
      .expect(200)
      .end((err, res) => {
        if (err || res.status !== 200) {
          console.error('User API failed:', res.body);
          return done(new Error('Failed to update a user profile'));
        }
        expect(res.body).to.have.property('username', username);
        expect(res.body).to.have.property('email', 'testupdate@example.com');
        expect(res.body).to.have.property('aboutMe', 'I am a test user.');
        expect(res.body).to.have.property('address', '123 Test St');
        expect(res.body).to.have.property('latitude', 40.7128);
        expect(res.body).to.have.property('longitude', -74.006);
        expect(res.body).to.have.property('phone', '123-456-7890');
        done(err);
      });
  });
  // Create a new dog
  it('should create a new dog', (done) => {
    request(app)
      .post('/api/dog/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        breed: 'Labrador',
        dob: '2019-01-01',
        gender: 'Male',
        weight: 30,
        bio: 'Friendly and energetic',
        neutered: true
      })
      .expect(201)
      .end((err, res) => {
        if (err || res.status !== 201) {
          console.error('Dog API failed:', res.body);
          return done(new Error('Failed to test retrieve all'));
        }
        expect(res.body).to.have.property('_id');
        createdDogId = res.body._id; // Save created dog ID for further tests
        done(err);
      });
  });

  // Retrieve all dogs
  it('should retrieve all dogs', (done) => {
    request(app)
      .get('/api/dog')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err || res.status !== 200) {
          console.error('Dog API failed:', res.body);
          return done(new Error('Failed to test retrieve all'));
        }
        expect(res.body).to.be.an('array');
        done(err);
      });
  });

  // Retrieve a single dog
  it('should retrieve a single dog', (done) => {
    request(app)
      .get(`/api/dog/${createdDogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err || res.status !== 200) {
          console.error('Dog API failed:', res.body);
          return done(new Error('Failed to test retrieve a single dog'));
        }
        expect(res.body).to.have.property('name');
        done(err);
      });
  });

  // Update a dog
  it('should update a dog', (done) => {
    request(app)
      .put(`/api/dog/${createdDogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Dog',
        breed: 'Golden Retriever',
        dob: '2018-05-10',
        gender: 'Female',
        weight: 35,
        bio: 'Loving and playful',
        neutered: false
      })
      .expect(200)
      .end((err, res) => {
        if (err || res.status !== 200) {
          console.error('Dog API failed:', res.body);
          return done(new Error('Failed to update a dog'));
        }
        expect(res.body).to.have.property('name', 'Updated Dog');
        expect(res.body).to.have.property('breed', 'Golden Retriever');
        expect(res.body).to.have.property('dob', '2018-05-10T00:00:00.000Z');
        expect(res.body).to.have.property('gender', 'Female');
        expect(res.body).to.have.property('weight', 35);
        expect(res.body).to.have.property('bio', 'Loving and playful');
        expect(res.body).to.have.property('neutered', false);
        done(err);
      });
  });

  // Delete a dog
  it('should delete a dog', (done) => {
    request(app)
      .delete(`/api/dog/${createdDogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      .end((err, res) => {
        if (err || res.status !== 204) {
          console.error('Dog API failed:', res.body);
          return done(new Error('Failed to delete a dog'));
        }
        done();
      });
  });
});
