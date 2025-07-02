import React from "react";
import { Card, CardBody, Input, Button, Link } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";

const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate("/admin/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-effect border border-white/10">
          <CardBody className="p-6">
            <div className="flex justify-center mb-6">
              <Icon icon="lucide:lock" className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-6">Вход в панель администратора</h1>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Имя пользователя"
                placeholder="Введите имя пользователя"
                value={username}
                onValueChange={setUsername}
                variant="bordered"
                isRequired
                startContent={<Icon icon="lucide:user" className="text-foreground/50" />}
              />
              
              <Input
                label="Пароль"
                placeholder="Введите пароль"
                value={password}
                onValueChange={setPassword}
                type="password"
                variant="bordered"
                isRequired
                startContent={<Icon icon="lucide:key" className="text-foreground/50" />}
              />
              
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
                startContent={!isLoading && <Icon icon="lucide:log-in" />}
              >
                Войти
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Button
                as={Link}
                to="/"
                color="default"
                variant="light"
                className="text-primary"
              >
                Вернуться на сайт
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;