import React from "react";
import { Card, CardBody, Button, Input, Spinner, addToast } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
// import { works } from "../../data/works"; // Это больше не нужно для инициализации, если используем localStorage

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
}

// Ключ для localStorage для галереи
const GALLERY_STORAGE_KEY = "portfolio_gallery_images";

// Инициализация галереи из localStorage или пустой массив
const getInitialGalleryImages = (): GalleryImage[] => {
  const savedImages = localStorage.getItem(GALLERY_STORAGE_KEY);
  return savedImages ? JSON.parse(savedImages) : [];
};

const AdminGalleryPage: React.FC = () => {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [newImageTitle, setNewImageTitle] = React.useState("");
  const [newImageUrl, setNewImageUrl] = React.useState(""); // <-- НОВОЕ: состояние для URL изображения
  // const fileInputRef = React.useRef<HTMLInputElement>(null); // ЭТО БОЛЬШЕ НЕ НУЖНО
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { /* ЭТО БОЛЬШЕ НЕ НУЖНО */ };

  React.useEffect(() => {
    // Загружаем данные из localStorage
    setLoading(true);
    setTimeout(() => { // Имитация задержки
      setImages(getInitialGalleryImages());
      setLoading(false);
    }, 500); 
  }, []);
  
  // Функция для сохранения изображений в localStorage
  const saveImagesToLocalStorage = (currentImages: GalleryImage[]) => {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(currentImages));
  };

  const handleAddImage = () => { // Изменил название функции
    if (!newImageTitle.trim() || !newImageUrl.trim()) { // Проверяем URL
      addToast({
        title: "Ошибка",
        description: "Пожалуйста, введите название и URL изображения",
        color: "danger",
      });
      return;
    }

    setUploading(true);

    // Имитация загрузки и сохранения (без реальной загрузки файла)
    setTimeout(() => {
      const newImage: GalleryImage = {
        id: `img-${Date.now()}`,
        imageUrl: newImageUrl.trim(), // Используем введенный URL
        title: newImageTitle.trim(),
      };

      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      saveImagesToLocalStorage(updatedImages); // Сохраняем в localStorage
      
      setNewImageTitle("");
      setNewImageUrl(""); // Очищаем поле URL
      setUploading(false);
      addToast({
        title: "Изображение добавлено",
        description: "Изображение успешно добавлено в галерею",
        color: "success",
      });
    }, 1000); // Имитация задержки
  };
  
  const handleDeleteImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    saveImagesToLocalStorage(updatedImages); // Сохраняем изменения в localStorage
    addToast({
      title: "Изображение удалено",
      description: "Изображение успешно удалено из галереи",
      color: "warning",
    });
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
            <Input // <-- НОВОЕ: Поле для ввода URL
              label="URL изображения"
              placeholder="https://i.imgur.com/your-image.jpg" // Пример с Imgur
              value={newImageUrl}
              onValueChange={setNewImageUrl}
              variant="bordered"
              className="flex-grow"
              isRequired
              startContent={<Icon icon="lucide:link" className="text-foreground/50" />}
            />
            {/* УБРАТЬ ЭТОТ БЛОК КОДА: */}
            {/* <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
            <Button
              color="default"
              variant="flat"
              onPress={() => fileInputRef.current?.click()}
              startContent={<Icon icon="lucide:upload" />}
            >
              Выбрать файл
            </Button> */}
            {/* /УБРАТЬ ЭТОТ БЛОК КОДА */}
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