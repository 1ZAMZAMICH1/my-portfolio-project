import React from "react";
import { Card, CardBody, Button, Input, Spinner, addToast } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
// --- ИМПОРТИРУЕМ НАШИ ПРАВИЛЬНЫЕ ФУНКЦИИ ---
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "../../services/gallery-service";
import { GalleryImage } from "../../types/gallery";

// ВСЕ, ЧТО СВЯЗАНО С LOCALSTORAGE, УДАЛЯЕМ.

const AdminGalleryPage: React.FC = () => {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [newImageTitle, setNewImageTitle] = React.useState("");
  const [newImageUrl, setNewImageUrl] = React.useState("");

  // Функция для загрузки данных с нашего API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const fetchedImages = await getGalleryImages();
      setImages(fetchedImages);
    } catch (error) {
      addToast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображения из базы данных.",
        color: "danger",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем данные при первом рендере страницы
  React.useEffect(() => {
    fetchImages();
  }, []);

  // Обработчик добавления изображения
  const handleAddImage = async () => {
    if (!newImageTitle.trim() || !newImageUrl.trim()) {
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, введите название и URL изображения",
        color: "danger",
      });
      return;
    }

    setUploading(true);

    const newImage: Omit<GalleryImage, 'id'> = {
      imageUrl: newImageUrl.trim(),
      title: newImageTitle.trim(),
    };

    try {
      // Вызываем нашу новую функцию для добавления
      await addGalleryImage(newImage);
      
      addToast({
        title: "Изображение добавлено",
        description: "Изображение успешно добавлено в галерею",
        color: "success",
      });

      // Очищаем поля и перезагружаем список
      setNewImageTitle("");
      setNewImageUrl("");
      fetchImages(); // Перезагружаем список, чтобы увидеть новую картинку
    } catch (error) {
      addToast({
        title: "Ошибка сохранения",
        description: "Не удалось сохранить изображение.",
        color: "danger",
      });
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  
  // Обработчик удаления изображения
  const handleDeleteImage = async (id: string) => {
    try {
      await deleteGalleryImage(id);
      addToast({
        title: "Изображение удалено",
        description: "Изображение успешно удалено из галереи",
        color: "warning",
      });
      fetchImages(); // Перезагружаем список
    } catch (error) {
      addToast({
        title: "Ошибка удаления",
        description: "Не удалось удалить изображение.",
        color: "danger",
      });
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Галерея</h2>
      </div>

      <Card className="glass-effect border border-white/10">
        <CardBody className="p-6">
          <h3 className="text-xl font-semibold mb-4">Добавить новое изображение</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              label="Название изображения"
              placeholder="Введите название"
              value={newImageTitle}
              onValueChange={setNewImageTitle}
              variant="bordered"
              className="flex-grow"
              isRequired
            />
            <Input
              label="URL изображения"
              placeholder="https://.../your-image.jpg"
              value={newImageUrl}
              onValueChange={setNewImageUrl}
              variant="bordered"
              className="flex-grow"
              isRequired
              startContent={<Icon icon="lucide:link" className="text-foreground/50" />}
            />
            <Button
              color="primary"
              onPress={handleAddImage}
              isLoading={uploading}
              startContent={!uploading && <Icon icon="lucide:plus" />}
            >
              Добавить изображение
            </Button>
          </div>

          <h3 className="text-xl font-semibold mb-4">Все изображения</h3>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner size="lg" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12 text-foreground/70">
              <Icon icon="lucide:image" className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>В галерее пока нет изображений</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full aspect-square object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <Button 
                      color="danger" 
                      size="sm" 
                      isIconOnly
                      className="self-end"
                      variant="flat"
                      onPress={() => handleDeleteImage(image.id)}
                    >
                      <Icon icon="lucide:trash" />
                    </Button>
                    <p className="text-white font-medium">{image.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default AdminGalleryPage;