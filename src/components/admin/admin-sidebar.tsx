import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../contexts/auth-context";

const AdminSidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  
  const menuItems = [
    {
      name: "Панель управления",
      path: "/admin/dashboard",
      icon: "lucide:layout-dashboard"
    },
    {
      name: "Графический дизайн",
      path: "/admin/dashboard/design",
      icon: "lucide:palette"
    },
    {
      name: "Веб-сайты",
      path: "/admin/dashboard/websites",
      icon: "lucide:globe"
    },
    {
      name: "Приложения",
      path: "/admin/dashboard/apps",
      icon: "lucide:smartphone"
    },
    {
      name: "Презентации",
      path: "/admin/dashboard/presentations",
      icon: "lucide:presentation"
    },
    {
      name: "Галерея",
      path: "/admin/dashboard/gallery",
      icon: "lucide:image"
    },
    {
      name: "Настройки",
      path: "/admin/dashboard/settings",
      icon: "lucide:settings"
    }
  ];
  
  return (
    <div className="glass-effect border-r border-white/10 h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Icon icon="lucide:layers" className="text-primary w-6 h-6" />
        <span className="font-bold text-gradient">АДМИН-ПАНЕЛЬ</span>
      </div>
      
      <div className="flex-grow p-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              as={Link}
              to={item.path}
              variant="flat"
              color={pathname === item.path ? "primary" : "default"}
              className="justify-start w-full"
              startContent={<Icon icon={item.icon} />}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Button
          variant="flat"
          color="danger"
          className="justify-start w-full"
          startContent={<Icon icon="lucide:log-out" />}
          onPress={logout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;