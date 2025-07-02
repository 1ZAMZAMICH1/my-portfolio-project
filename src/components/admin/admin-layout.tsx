import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/auth-context';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className="glass-effect">
        <NavbarBrand>
          <Link to="/admin/dashboard" className="font-bold text-xl text-gradient">
            АДМИН ПАНЕЛЬ
          </Link>
        </NavbarBrand>
        
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link to="/admin/dashboard" className="text-white hover:text-primary transition-colors">
              Панель управления
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/admin/work/new" className="text-white hover:text-primary transition-colors">
              Добавить работу
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Просмотр сайта
            </Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                isIconOnly 
                variant="ghost" 
                className="text-white"
              >
                <Icon icon="lucide:user" width={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Действия пользователя">
              <DropdownItem key="profile" startContent={<Icon icon="lucide:user" />}>
                Профиль
              </DropdownItem>
              <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" />}>
                Настройки
              </DropdownItem>
              <DropdownItem 
                key="logout" 
                startContent={<Icon icon="lucide:log-out" />}
                className="text-danger"
                onPress={handleLogout}
              >
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
        {children}
      </main>
      
      <footer className="glass-effect py-4">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Админ панель портфолио</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;