import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = Cookies.get('token');
    if (!token) { setLoading(false); return; }
    try {
      const res = await api.get('/users/me');
      setUser(res.data);
    } catch (err) {
      Cookies.remove('token');
      setUser(null);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadUser(); }, []);

  const login = (token) => {
    Cookies.set('token', token, { expires: 7 });
    loadUser();
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
