import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Администратор (фиксированный аккаунт)
  const ADMIN_CREDENTIALS = {
    email: 'admin@dacha.com',
    password: 'admin123',
    name: 'Администратор',
    isAdmin: true
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('dacha_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Если пользователь администратор, проверяем режим администратора
        if (parsedUser.isAdmin) {
          const adminMode = localStorage.getItem('admin_mode') === 'true';
          if (adminMode) {
            // Режим админа уже включен в localStorage
          }
        }
      } catch (e) {
        localStorage.removeItem('dacha_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Проверка на администратора
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser = { 
        id: 999, 
        name: ADMIN_CREDENTIALS.name, 
        email, 
        isAdmin: true,
        bookings: [] 
      };
      setUser(adminUser);
      localStorage.setItem('dacha_user', JSON.stringify(adminUser));
      localStorage.setItem('admin_mode', 'true');
      toast.success(`Добро пожаловать, Администратор!`);
      return true;
    }
    
    // Проверка обычных пользователей
    const users = JSON.parse(localStorage.getItem('dacha_users_db') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('dacha_user', JSON.stringify(foundUser));
      toast.success(`С возвращением, ${foundUser.name}!`);
      return true;
    } else {
      toast.error('Неверный email или пароль');
      return false;
    }
  };

  const register = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('dacha_users_db') || '[]');
    
    if (users.find(u => u.email === email)) {
      toast.error('Такой email уже зарегистрирован');
      return false;
    }

    const newUser = { 
      id: Date.now(), 
      name, 
      email, 
      password, 
      isAdmin: false,
      bookings: [] 
    };
    users.push(newUser);
    localStorage.setItem('dacha_users_db', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('dacha_user', JSON.stringify(newUser));
    toast.success('Регистрация успешна!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dacha_user');
    localStorage.removeItem('admin_mode');
    toast('Вы вышли из системы', { icon: '👋' });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);