import React from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

type User = {
  username: string;
  isAdmin: boolean;
} | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// В реальном приложении эти данные должны храниться безопасно на сервере
const ADMIN_CREDENTIALS = {
  username: "zamzamich",
  password: "zamzamich33712",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User>(() => {
    const savedUser = localStorage.getItem("portfolio_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Replace useNavigate with useLocation and window.location for compatibility
  const navigate = useNavigate();
  
  const login = async (username: string, password: string): Promise<boolean> => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Проверка учетных данных
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData = { username, isAdmin: true };
      setUser(userData);
      localStorage.setItem("portfolio_user", JSON.stringify(userData));
      
      addToast({
        title: "Успешный вход",
        description: "Добро пожаловать в панель администратора",
        color: "success",
      });
      
      return true;
    }
    
    addToast({
      title: "Ошибка входа",
      description: "Неверное имя пользователя или пароль",
      color: "danger",
    });
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("portfolio_user");
    navigate("/");
    addToast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};