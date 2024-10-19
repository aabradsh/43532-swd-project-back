// unit testing
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const usersFilePath = path.join(__dirname, 'users.json');

// mock readUsersFromFile and writeUsersToFile functions
const readUsersFromFile = jest.fn();
const writeUserToFile = jest.fn();

// mock user data for login and registration
let mockUsers = [
  { email: 'test@example.com', password: 'password123' },
];

// setup the login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFromFile();

  const existingUser = users.find(user => user.email === email);
  if (!existingUser || existingUser.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', user: { email: existingUser.email } });
});

// tests for login
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

// setup the registration route
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // check for missing email or password
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const users = readUsersFromFile();

  // check for existing user
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // simulate writing the user to the file
  mockUsers.push({ email, password });
  writeUserToFile(mockUsers);

  res.status(201).json({ message: 'Registration successful' });
});

// tests for registration
describe('POST /api/register', () => {
  beforeEach(() => {
    readUsersFromFile.mockReturnValue(mockUsers);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockUsers = [];  // reset mock users after each test
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
    await request(app).post('/api/register').send({
      email: 'duplicate@example.com',
      password: 'password123',
    });

    // attempt to register the same user again
    const response = await request(app).post('/api/register').send({
      email: 'duplicate@example.com',
      password: 'password123',
    });

    expect(response.body).toEqual({ error: 'Email already registered' });
  });

  it('should return 400 for missing email', async () => {
    const response = await request(app).post('/api/register').send({
      password: 'password123',
    });

    expect(response.body).toEqual({ error: 'Email and password are required' });
  });

  it('should return 400 for missing password', async () => {
    const response = await request(app).post('/api/register').send({
      email: 'noPassword@example.com',
    });

    expect(response.body).toEqual({ error: 'Email and password are required' });
  });
});

// setup the profile management route
app.post('/api/profile', (req, res) => {
  const { email, profile } = req.body;
  const users = readUsersFromFile();

  // find the user by email
  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // update user profile and write to file
  users[userIndex].profile = profile;
  writeUserToFile(users);

  return res.status(200).json({ message: 'Profile updated successfully!' });
});

// tests for profile management
describe('POST /api/profile', () => {
  const mockProfileUsers = [
    { email: 'test@example.com', profile: { fullName: 'John Doe', skills: ['Coding'] } },
  ];

  beforeEach(() => {
    readUsersFromFile.mockReturnValue(mockProfileUsers);
    jest.clearAllMocks();
  });

  it('should return 200 and success message when profile is updated', async () => {
    const updatedProfile = {
      fullName: 'Jane Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      skills: ['Design'],
    };

    const response = await request(app).post('/api/profile').send({
      email: 'test@example.com',
      profile: updatedProfile,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Profile updated successfully!');
    expect(writeUserToFile).toHaveBeenCalledWith([
      { email: 'test@example.com', profile: updatedProfile },
    ]);
  });

  it('should return 404 if user is not found', async () => {
    const response = await request(app).post('/api/profile').send({
      email: 'unknown@example.com',
      profile: { fullName: 'Unknown User' },
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('User not found');
    expect(writeUserToFile).not.toHaveBeenCalled();
  });

  it('should validate the required fields', async () => {
    const response = await request(app).post('/api/profile').send({
      email: 'test@example.com',
      profile: { fullName: '' },
    });
  });
});
