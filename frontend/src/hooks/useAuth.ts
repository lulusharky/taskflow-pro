import { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authService.getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    authService.setToken(response.access_token);
    setIsAuthenticated(true);
    return response;
  };

  const register = async (email: string, username: string, password: string) => {
    const response = await authService.register({ email, username, password });
    return response;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
}
