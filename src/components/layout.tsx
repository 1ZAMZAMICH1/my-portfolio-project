import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        className="glass-effect"
        maxWidth="xl"
      >
        <NavbarBrand>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl text-gradient"
          >
            ПОРТФОЛИО
          </motion.div>
        </NavbarBrand>
        
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={isActive('/')}>
            <Link to="/" className={`text-white ${isActive('/') ? 'font-semibold' : 'opacity-70'} hover:opacity-100 transition-opacity`}>
              Главная
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/graphic-design')}>
            <Link to="/graphic-design" className={`text-white ${isActive('/graphic-design') ? 'font-semibold' : 'opacity-70'} hover:opacity-100 transition-opacity`}>
              Графический дизайн
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/websites')}>
            <Link to="/websites" className={`text-white ${isActive('/websites') ? 'font-semibold' : 'opacity-70'} hover:opacity-100 transition-opacity`}>
              Сайты
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/apps')}>
            <Link to="/apps" className={`text-white ${isActive('/apps') ? 'font-semibold' : 'opacity-70'} hover:opacity-100 transition-opacity`}>
              Приложения
            </Link>
          </NavbarItem>
          <NavbarItem isActive={isActive('/presentations')}>
            <Link to="/presentations" className={`text-white ${isActive('/presentations') ? 'font-semibold' : 'opacity-70'} hover:opacity-100 transition-opacity`}>
              Презентации
            </Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent justify="end">
          <NavbarItem>
            <Link to="/admin/login">
              <Button 
                isIconOnly 
                variant="ghost" 
                className="text-white"
                aria-label="Вход для администратора"
              >
                <Icon icon="lucide:lock" width={20} />
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="glass-effect py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-white opacity-70 text-sm">
          <p>© {new Date().getFullYear()} Современное портфолио. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;