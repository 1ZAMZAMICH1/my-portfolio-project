import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardBody, Input, Textarea, Button, Chip, Select, SelectItem, addToast } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { getWorkById, addWork, updateWork } from "../../services/work-service";
import { getCategoryName, Work, WorkCategory } from "../../types/work";

const AdminWorkForm: React.FC = () => {
  const { id, category } = useParams<{ id?: string; category?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = React.useState<Partial<Work>>({
    title: "",
    description: "",
    category: (category as WorkCategory) || "design",
    imageUrl: "", // Здесь будет URL
    additionalImages: [], // Здесь будут URL-ы
    tags: [],
    date: new Date().toISOString().split('T')[0],
    client: "",
    link: ""
  });
  
  const [newTag, setNewTag] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // УДАЛЯЕМ ЭТИ СОСТОЯНИЯ ДЛЯ ФАЙЛОВ:
  // const [imageFile, setImageFile] = React.useState<File | null>(null);
  // const [additionalImageFiles, setAdditionalImageFiles] = React.useState<File[]>([]);
  
  // НОВЫЕ СОСТОЯНИЯ ДЛЯ ВВОДА URL ДОПОЛНИТЕЛЬНЫХ ИЗОБРАЖЕНИЙ:
  const [newAdditionalImageUrl, setNewAdditionalImageUrl] = React.useState("");

  React.useEffect(() => {
    if (isEditMode && id) {
      const loadWork = async () => {
        try {
          const work = await getWorkById(id);
          if (work) {
            setFormData(work);
          } else {
            addToast({
              title: "Ошибка",
              description: "Работа не найдена",
              color: "danger",
            });
            navigate(`/admin/dashboard/${category || 'design'}`);
          }
        } catch (error) {
          console.error("Ошибка при загрузке работы:", error);
          addToast({
            title: "Ошибка",
            description: "Не удалось загрузить работу",
            color: "danger",
          });
          navigate(`/admin/dashboard/${category || 'design'}`);
        }
      };
      loadWork();
    }
  }, [isEditMode, id, category, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string | number) => {
    setFormData(prev => ({ ...prev, category: value as WorkCategory }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...(prev.tags || []), newTag.trim()] 
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  // НОВАЯ ФУНКЦИЯ: Добавление дополнительного изображения по URL
  const handleAddAdditionalImage = () => {
    if (newAdditionalImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalImages: [...(prev.additionalImages || []), newAdditionalImageUrl.trim()],
      }));
      setNewAdditionalImageUrl("");
    } else {
      addToast({
        title: "Ошибка",
        description: "Введите URL дополнительного изображения",
        color: "danger",
      });
    }
  };

  const handleRemoveAdditionalImage = (urlToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages?.filter(url => url !== urlToRemove) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.title || !formData.description || !formData.category || !formData.imageUrl) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля (Название, Описание, Категория, Главное изображение)",
        color: "danger",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEditMode && id) {
        await updateWork(id, formData);
        addToast({
          title: "Успех",
          description: "Работа успешно обновлена!",
          color: "success",
        });
      } else {
        await addWork(formData as Omit<Work, 'id'>);
        addToast({
          title: "Успех",
          description: "Работа успешно добавлена!",
          color: "success",
        });
      }
      navigate(`/admin/dashboard/${formData.category}`);
    } catch (error) {
      console.error("Ошибка при сохранении работы:", error);
      addToast({
        title: "Ошибка",
        description: `Не удалось сохранить работу: ${error instanceof Error ? error.message : String(error)}`,
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "design", label: "Графический дизайн" },
    { value: "websites", label: "Веб-сайты" },
    { value: "apps", label: "Приложения" },
    { value: "presentations", label: "Презентации" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          {isEditMode ? "Редактировать работу" : "Добавить новую работу"}
        </h2>
      </div>

      <Card className="glass-effect border border-white/10">
        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Название работы"
              name="title"
              placeholder="Введите название"
              value={formData.title || ""}
              onValueChange={(val) => setFormData(prev => ({ ...prev, title: val }))}
              variant="bordered"
              isRequired
            />
            <Textarea
              label="Описание"
              name="description"
              placeholder="Подробное описание работы"
              value={formData.description || ""}
              onValueChange={(val) => setFormData(prev => ({ ...prev, description: val }))}
              variant="bordered"
              isRequired
            />
            <Select
              label="Категория"
              name="category"
              placeholder="Выберите категорию"
              selectedKeys={formData.category ? [formData.category] : []}
              onSelectionChange={(keys) => handleSelectChange(Array.from(keys).join(','))}
              variant="bordered"
              isRequired
            >
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </Select>

            {/* ГЛАВНОЕ ИЗОБРАЖЕНИЕ */}
            <div>
              <Input
                label="URL главного изображения"
                name="imageUrl"
                placeholder="https://i.imgur.com/main-image.jpg"
                value={formData.imageUrl || ""}
                onValueChange={(val) => setFormData(prev => ({ ...prev, imageUrl: val }))}
                variant="bordered"
                isRequired
                startContent={<Icon icon="lucide:image" className="text-foreground/50" />}
              />
              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm text-foreground/70 mb-2">Предварительный просмотр:</p>
                  <img src={formData.imageUrl} alt="Главное изображение" className="w-full max-w-sm h-auto rounded-lg" />
                </div>
              )}
            </div>

            {/* ДОПОЛНИТЕЛЬНЫЕ ИЗОБРАЖЕНИЯ */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Дополнительные изображения</h3>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="URL дополнительного изображения"
                  value={newAdditionalImageUrl}
                  onValueChange={setNewAdditionalImageUrl}
                  variant="bordered"
                  className="flex-grow"
                  startContent={<Icon icon="lucide:image" className="text-foreground/50" />}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAdditionalImage();
                    }
                  }}
                />
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={handleAddAdditionalImage}
                >
                  Добавить
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(formData.additionalImages || []).map((url, index) => (
                  <div key={index} className="relative group">
                    <img src={url} alt={`Доп. изображение ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                    <Button 
                      color="danger" 
                      size="sm" 
                      isIconOnly
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      variant="flat"
                      onPress={() => handleRemoveAdditionalImage(url)}
                    >
                      <Icon icon="lucide:trash" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Input
              label="Дата выполнения"
              name="date"
              type="date"
              value={formData.date || new Date().toISOString().split('T')[0]}
              onValueChange={(val) => setFormData(prev => ({ ...prev, date: val }))}
              variant="bordered"
            />
            <Input
              label="Клиент"
              name="client"
              placeholder="Название клиента"
              value={formData.client || ""}
              onValueChange={(val) => setFormData(prev => ({ ...prev, client: val }))}
              variant="bordered"
            />
            <Input
              label="Ссылка на проект (необязательно)"
              name="link"
              placeholder="https://example.com/project"
              value={formData.link || ""}
              onValueChange={(val) => setFormData(prev => ({ ...prev, link: val }))}
              variant="bordered"
            />

            <div>
              <h3 className="text-lg font-semibold mb-2">Теги</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {(formData.tags || []).map((tag, index) => (
                  <Chip 
                    key={index} 
                    onClose={() => handleRemoveTag(tag)} 
                    variant="flat" 
                    color="primary"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Добавить тег"
                  value={newTag}
                  onValueChange={setNewTag}
                  variant="bordered"
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={handleAddTag}
                >
                  Добавить
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                color="default" 
                variant="flat"
                onPress={() => navigate(`/admin/dashboard/${formData.category}`)}
              >
                Отмена
              </Button>
              <Button 
                type="submit" 
                color="primary"
                isLoading={isSubmitting}
              >
                {isEditMode ? "Сохранить изменения" : "Добавить работу"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default AdminWorkForm;