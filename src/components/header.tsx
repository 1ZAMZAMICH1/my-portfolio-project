import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom"; 
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/auth-context";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  const location = useLocation(); // Для отслеживания текущего URL

  // Состояние для хранения ширины и позиции активного элемента подсветки
  const [activeIndicatorStyles, setActiveIndicatorStyles] = React.useState({
    left: 0,
    width: 0,
  });

  // Рефы для каждого навигационного элемента
  const designRef = React.useRef<HTMLAnchorElement>(null);
  const websitesRef = React.useRef<HTMLAnchorElement>(null);
  const appsRef = React.useRef<HTMLAnchorElement>(null);
  const presentationsRef = React.useRef<HTMLAnchorElement>(null);

  // Маппинг категорий к их рефам для удобства
  const navItemRefs: Record<string, React.RefObject<HTMLAnchorElement>> = {
    design: designRef,
    websites: websitesRef,
    apps: appsRef,
    presentations: presentationsRef,
  };

  // Отслеживание скролла для изменения стиля навигации
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Эффект для определения активного элемента и его размеров для подсветки
  React.useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentCategory = pathParts.length >= 3 && pathParts[1] === 'works' ? pathParts[2] : null;

    if (currentCategory && navItemRefs[currentCategory]?.current) {
      const activeElement = navItemRefs[currentCategory].current;
      const parentContainer = activeElement?.closest('.relative.h-full.flex.items-center');

      if (activeElement && parentContainer) {
        const activeRect = activeElement.getBoundingClientRect();
        const parentRect = parentContainer.getBoundingClientRect();

        setActiveIndicatorStyles({
          left: activeRect.left - parentRect.left, 
          width: activeRect.width, 
        });
      }
    } else {
      setActiveIndicatorStyles({ left: 0, width: 0 }); // Скрываем индикатор, если нет активной категории
    }
  }, [location.pathname, navItemRefs]); 

  return (
    <Navbar 
      className={`backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled 
          ? "bg-black/90 border-white/10" 
          : "bg-black/40 border-transparent"
      }`}
      maxWidth="xl"
    >
      <NavbarBrand>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ВОТ ВАШ ПРАВИЛЬНЫЙ ЛОГОТИП - Я ОБЕЩАЮ, ЧТО ОН ОСТАЛСЯ БЕЗ ИЗМЕНЕНИЙ */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1749157242/ZAMZAMICH_LOGO_WHITE_p78cra.png" 
              alt="Мой логотип" 
              className="w-12 h-12 object-contain" 
            />
            <span className="text-2xl text-white font-normal tracking-widest uppercase">ZAMZAMICH</span>
          </Link>
        </motion.div>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 h-full" justify="center">
        <div className="relative h-full flex items-center">
          {/* ДОБАВЛЕНЫ ref для каждого NavLink, удалены onMouseEnter/onMouseLeave */}
          <NavLink
            ref={designRef} 
            to="/works/design"
            className={({ isActive }) =>
              `relative px-3 py-2 text-white/70 hover:text-white transition-colors duration-200 ${
                isActive ? "font-semibold text-white" : ""
              }`
            }
          >
            Графический дизайн
          </NavLink>
          <NavLink
            ref={websitesRef} 
            to="/works/websites"
            className={({ isActive }) =>
              `relative px-3 py-2 text-white/70 hover:text-white transition-colors duration-200 ${
                isActive ? "font-semibold text-white" : ""
              }`
            }
          >
            Веб-сайты
          </NavLink>
          <NavLink
            ref={appsRef} 
            to="/works/apps"
            className={({ isActive }) =>
              `relative px-3 py-2 text-white/70 hover:text-white transition-colors duration-200 ${
                isActive ? "font-semibold text-white" : ""
              }`
            }
          >
            Приложения
          </NavLink>
          <NavLink
            ref={presentationsRef} 
            to="/works/presentations"
            className={({ isActive }) =>
              `relative px-3 py-2 text-white/70 hover:text-white transition-colors duration-200 ${
                isActive ? "font-semibold text-white" : ""
              }`
            }
          >
            Презентации
          </NavLink>

          {/* ИЗМЕНЕНО: используем activeIndicatorStyles для left и width */}
          {activeIndicatorStyles.width > 0 && ( 
            <motion.span
              layoutId="active-nav-item"
              className="absolute bottom-0 h-[3px] bg-red-500 rounded-full"
              initial={false}
              animate={{
                left: activeIndicatorStyles.left,
                width: activeIndicatorStyles.width,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      </NavbarContent>
      
      <NavbarContent justify="end">
        {isAuthenticated ? (
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                color="primary" 
                className="bg-transparent border border-red-500 rounded-none"
                startContent={<Icon icon="lucide:user" />}
              >
                {user?.username}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Admin actions">
              <DropdownItem key="dashboard" as={Link} to="/admin/dashboard">
                Панель управления
              </DropdownItem>
              <DropdownItem key="logout" onPress={logout}>
                Выйти
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Link to="/admin" className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <Icon icon="lucide:lock" className="text-white" />
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;