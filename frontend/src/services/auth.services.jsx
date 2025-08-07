import { api } from '../utilities/Api';

export const AuthServiceImpl = {
  login: async (user) => {
    if (!user.email || !user.password) {
      throw new Error("Email and password are required");
    }

    try {
      const response = await api.post('/auth/login', user);
      console.log('Login successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed, please try again.');
    }
  },
  register: async (newUser) => {
    if (!newUser || !newUser.email || !newUser.password || !newUser.name) {
      throw new Error("User data is required");
    }

    try {
      const response = await api.post('/auth/register', newUser);
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed, please try again.');
    }
  }
};