import React from "react";
import { Button, Card, CardBody, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, addToast } from "@heroui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { getWorksByCategory, deleteWork } from "../../services/work-service";
import { getCategoryName, Work } from "../../types/work";

interface AdminWorksListProps {
  category: string;
}

const AdminWorksList: React.FC<AdminWorksListProps> = ({ category }) => {
  const [works, setWorks] = React.useState<Work[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Загрузка данных из localStorage через сервис
    const loadWorks = async () => {
      setLoading(true);
      try {
        const categoryWorks = await getWorksByCategory(category as WorkCategory);
        setWorks(categoryWorks);
      } catch (error) {
        console.error("Ошибка при загрузке работ:", error);
        addToast({
          title: "Ошибка",
          description: "Не удалось загрузить работы",
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadWorks();
  }, [category]);
  
  const filteredWorks = works.filter(work => 
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (work.client && work.client.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleDelete = async (workId: string) => {
    try {
      const success = await deleteWork(workId);
      
      if (success) {
        setWorks(works.filter(work => work.id !== workId));
        
        addToast({
          title: "Работа удалена",
          description: "Работа была успешно удалена из портфолио",
          color: "success",
        });
      } else {
        addToast({
          title: "Ошибка",
          description: "Не удалось удалить работу",
          color: "danger",
        });
      }
    } catch (error) {
      console.error("Ошибка при удалении работы:", error);
      addToast({
        title: "Ошибка",
        description: "Произошла ошибка при удалении работы",
        color: "danger",
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{getCategoryName(category as any)}</h1>
        <Button 
          as={Link}
          to={`/admin/dashboard/create/${category}`}
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
        >
          Добавить работу
        </Button>
      </div>
      
      <Card className="glass-effect border border-white/10 mb-8">
        <CardBody>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Поиск по названию, описанию или клиенту"
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-foreground/50" />}
              isClearable
              className="flex-grow"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Название</th>
                  <th className="text-left py-3 px-4">Дата</th>
                  <th className="text-left py-3 px-4">Клиент</th>
                  <th className="text-left py-3 px-4">Теги</th>
                  <th className="text-right py-3 px-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center">
                      <div className="flex justify-center">
                        <Icon icon="lucide:loader" className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    </td>
                  </tr>
                ) : filteredWorks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-foreground/70">
                      {searchQuery ? "Нет работ, соответствующих поисковому запросу" : "Нет работ в этой категории"}
                    </td>
                  </tr>
                ) : (
                  filteredWorks.map((work) => (
                    <tr key={work.id} className="border-b border-white/10">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={work.imageUrl} 
                            alt={work.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>{work.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{new Date(work.date).toLocaleDateString('ru-RU')}</td>
                      <td className="py-3 px-4">{work.client || '—'}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {work.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {work.tags.length > 2 && (
                            <span className="text-xs bg-default/20 text-foreground/70 px-2 py-1 rounded">
                              +{work.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button 
                              variant="light" 
                              isIconOnly
                            >
                              <Icon icon="lucide:more-vertical" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Действия с работой">
                            <DropdownItem 
                              key="edit" 
                              as={Link} 
                              to={`/admin/dashboard/edit/${work.id}`}
                              startContent={<Icon icon="lucide:edit" />}
                            >
                              Редактировать
                            </DropdownItem>
                            <DropdownItem 
                              key="view" 
                              as={Link} 
                              to={`/works/${category}?id=${work.id}`}
                              target="_blank"
                              startContent={<Icon icon="lucide:eye" />}
                            >
                              Просмотреть
                            </DropdownItem>
                            <DropdownItem 
                              key="delete" 
                              className="text-danger"
                              color="danger"
                              startContent={<Icon icon="lucide:trash" />}
                              onPress={() => handleDelete(work.id)}
                            >
                              Удалить
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default AdminWorksList;