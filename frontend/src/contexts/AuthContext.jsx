import React, { createContext, useState, useEffect } from 'react';
import API from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null);
  useEffect(()=> {
    const token = localStorage.getItem('shopai_token');
    const userStr = localStorage.getItem('shopai_user');
    if (token && userStr) setUser(JSON.parse(userStr));
  }, []);
  const login = (token, user) => {
    localStorage.setItem('shopai_token', token);
    localStorage.setItem('shopai_user', JSON.stringify(user));
    setUser(user);
  };
  const logout = () => {
    localStorage.removeItem('shopai_token');
    localStorage.removeItem('shopai_user');
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
