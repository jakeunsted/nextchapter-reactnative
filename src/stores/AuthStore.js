import { create } from 'zustand';
import myFetch from '../services/api';
import { logout } from '../services/auth';
import { getAccessToken, getRefreshToken } from '../services/keychain';

export const AuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,

  getUser: () => {
    const { user } = get();
    return user;
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  verify: async () => {
    try {
      const response = await myFetch('/auth/check-status', {
        method: 'GET',
      });
      if (response) {
        set({ user: response.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error('Error with token:', error);
      set({ user: null });
      logout();
    }
  },

  initialiseAuth: async () => {
    try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      console.log('accessToken in init', accessToken);
      console.log('refreshToken in init', refreshToken);
      if (accessToken || refreshToken) {
        const response = await myFetch('/auth/check-status', {
          method: 'GET',
        });
        console.log('response user in init', response.user);
        
        if (response && response.user) {
          set({ 
            user: response.user,
            isAuthenticated: true 
          });
          return true;
        }
      }
      set({ user: null, isAuthenticated: false });
      return false;
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, isAuthenticated: false });
      return false;
    }
  },

  saveUserData: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
