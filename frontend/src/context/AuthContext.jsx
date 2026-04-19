import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data.user || res.data);
        } catch (error) {
          console.error("Error fetching user profile", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem('token', token);

    const profileRes = await api.get('/auth/profile');
    setUser(profileRes.data.user || profileRes.data);
  };

  const register = async (name, email, password, monthlyIncome, liquidCash, riskProfile) => {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
      monthlyIncome,
      liquidCash,
      riskProfile
    });
    const { token } = res.data;
    localStorage.setItem('token', token);

    const profileRes = await api.get('/auth/profile');
    setUser(profileRes.data.user || profileRes.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
