import {
  setRefreshToken,
  setAccessToken,
} from './keychain';
import { AuthStore } from '../stores/AuthStore';
import myFetch from '../services/api';

export const useAuth = () => {
  const { setUser } = AuthStore.getState();

  const login = async (username, password) => {

    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    try {
      const response = await myFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid credentials');
        } else if (response.status === 400) {
          throw new Error('Bad request');
        } else {
          throw new Error('Login failed');
        }
      }

      const data = await response.json();
      const { accessToken, refreshToken, user } = data;

      if (!accessToken || !refreshToken) {
        throw new Error('No tokens received');
      }

      if (!user) {
        throw new Error('No user data');
      }

      setUser(user);

      await setAccessToken(accessToken);
      await setRefreshToken(refreshToken);

      AuthStore.setState({ isAuthenticated: true });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const isAuthenticated = () => {
    const user = AuthStore.getState().getUser();
    return !!user;
  };

  return {
    login,
    isAuthenticated,
  };
};
