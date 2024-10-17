// server.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const usersFilePath = path.join(__dirname, 'users.json');

// Mock readUsersFromFile function
const readUsersFromFile = jest.fn();
const writeUserToFile = jest.fn();

// Mock user data
const mockUsers = [
  { email: 'test@example.com', password: 'password123' },
];

// Setup the login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();

  const existingUser = users.find(user => user.email === email);
  if (!existingUser || existingUser.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', user: { email: existingUser.email } });
});

// Tests for login
describe('POST /api/login', () => {
  beforeEach(() => {
    readUsersFromFile.mockReturnValue(mockUsers);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and success message for valid credentials', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Login successful', user: { email: 'test@example.com' } });
  });

  it('should return 401 for invalid email', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'wrong@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid email or password' });
  });

  it('should return 401 for incorrect password', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'test@example.com',
      password: 'wrongPassword',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid email or password' });
  });
});

// Mock user data for registration
let mockData = [];

// Setup the registration route
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Check for missing email or password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = readUsersFromFile();

  // Check for existing user
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Simulate writing the user to the file
  mockData.push({ email, password });
  writeUserToFile(mockData);

  res.status(201).json({ message: 'Registration successful' });
});

// Tests for registration
describe('POST /api/register', () => {
  beforeEach(() => {
    readUsersFromFile.mockReturnValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockData = [];  // Reset mock users after each test
  });

  it('should return 201 and success message for valid registration', async () => {
    const response = await request(app).post('/api/register').send({
      email: 'newuser@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'Registration successful' });
  });

  it('should return 400 for duplicate email registration', async () => {
    // First register the user
    await request(app).post('/api/register').send({
      email: 'duplicate@example.com',
      password: 'password123',
    });

    // Attempt to register the same user again
    const response = await request(app).post('/api/register').send({
      email: 'duplicate@example.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Email already registered' });
  });

  it('should return 400 for missing email', async () => {
    const response = await request(app).post('/api/register').send({
      password: 'password123',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Email and password are required' });
  });

  it('should return 400 for missing password', async () => {
    const response = await request(app).post('/api/register').send({
      email: 'noPassword@example.com',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Email and password are required' });
  });
});


