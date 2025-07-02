import React from "react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { works } from "../../data/works";

const AdminDashboardHome: React.FC = () => {
  const categories = [
    {
      id: "design",
      name: "Графический дизайн",
      icon: "lucide:palette",
      color: "bg-pink-500/20 text-pink-500"
    },
    {
      id: "websites",
      name: "Веб-сайты",
      icon: "lucide:globe",
      color: "bg-blue-500/20 text-blue-500"
    },
    {
      id: "apps",
      name: "Приложения",
      icon: "lucide:smartphone",
      color: "bg-green-500/20 text-green-500"
    },
    {
      id: "presentations",
      name: "Презентации",
      icon: "lucide:presentation",
      color: "bg-amber-500/20 text-amber-500"
    }
  ];
  
  const getCategoryCount = (categoryId: string) => {
    return works.filter(work => work.category === categoryId).length;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <div className="text-foreground/70">
          {new Date().toLocaleDateString('ru-RU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => (
          <Card key={category.id} className="glass-effect border border-white/10">
            <CardBody>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${category.color}`}>
                  <Icon icon={category.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-foreground/70">
                    {getCategoryCount(category.id)} проектов
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="border-t border-white/10 justify-between">
              <Button 
                as={Link}
                to={`/admin/dashboard/${category.id}`}
                variant="flat" 
                color="default"
                size="sm"
              >
                Управление
              </Button>
              <Button 
                as={Link}
                to={`/admin/dashboard/create/${category.id}`}
                variant="flat" 
                color="primary"
                size="sm"
                startContent={<Icon icon="lucide:plus" />}
              >
                Добавить
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="glass-effect border border-white/10 mb-8">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">Последние добавленные работы</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Название</th>
                  <th className="text-left py-3 px-4">Категория</th>
                  <th className="text-left py-3 px-4">Дата</th>
                  <th className="text-left py-3 px-4">Клиент</th>
                  <th className="text-right py-3 px-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {works.slice(0, 5).map((work) => (
                  <tr key={work.id} className="border-b border-white/10">
                    <td className="py-3 px-4">{work.title}</td>
                    <td className="py-3 px-4">
                      {work.category === 'design' && 'Графический дизайн'}
                      {work.category === 'websites' && 'Веб-сайты'}
                      {work.category === 'apps' && 'Приложения'}
                      {work.category === 'presentations' && 'Презентации'}
                    </td>
                    <td className="py-3 px-4">{new Date(work.date).toLocaleDateString('ru-RU')}</td>
                    <td className="py-3 px-4">{work.client || '—'}</td>
                    <td className="py-3 px-4 text-right">
                      <Button 
                        as={Link}
                        to={`/admin/dashboard/edit/${work.id}`}
                        variant="flat" 
                        color="primary"
                        size="sm"
                        className="mr-2"
                      >
                        Изменить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      
      <Card className="glass-effect border border-white/10">
        <CardBody className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Icon icon="lucide:info" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Инструкция по использованию</h3>
              <p className="text-foreground/70 mb-4">
                Здесь вы можете управлять всеми работами в вашем портфолио. Используйте панель слева для навигации 
                между разделами. Для добавления новой работы нажмите кнопку "Добавить" в соответствующей категории.
              </p>
              <Button 
                variant="flat" 
                color="primary"
                endContent={<Icon icon="lucide:external-link" />}
              >
                Открыть полную документацию
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default AdminDashboardHome;