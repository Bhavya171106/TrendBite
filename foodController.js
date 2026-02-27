const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const { name, email, password, restaurantName, location } = req.body;

    if (!name || !email || !password || !restaurantName || !location) {
      return res.status(400).json({
        error: 'name, email, password, restaurantName, and location are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existing = await userService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = await userService.createUser({
      name,
      email,
      password,
      restaurantName,
      location,
    });
    return res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    console.error('register error:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = userService.checkPassword(password, user.password_salt, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        restaurantName: user.restaurant_name,
        location: user.location,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('login error:', error);
    return res.status(500).json({ error: 'Failed to login' });
  }
};
