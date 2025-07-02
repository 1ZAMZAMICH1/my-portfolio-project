import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, Input, Button, Select, SelectItem, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Work, WorkCategory } from '../../types/work';
import { addWork, updateWork } from '../../services/work-service';

interface WorkFormProps {
  initialData?: Work;
}

const WorkForm: React.FC<WorkFormProps> = ({ initialData }) => {
  const history = useHistory();
  const isEditMode = !!initialData;
  
  const [formData, setFormData] = React.useState<Partial<Work>>(
    initialData || {
      title: '',
      description: '',
      category: 'graphic-design',
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      tags: []
    }
  );
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(initialData?.imageUrl || null);
  
  const handleChange = (key: keyof Work, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // В реальном приложении здесь должна быть загрузка на сервер
      // Для демонстрации используем локальный URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isEditMode && initialData?.id) {
        await updateWork(initialData.id, formData as Work);
      } else {
        await addWork(formData as Work);
      }
      history.push('/admin/dashboard');
    } catch (error) {
      console.error('Error saving work:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const categories: { value: WorkCategory; label: string }[] = [
    { value: 'graphic-design', label: 'Графический дизайн' },
    { value: 'websites', label: 'Сайты' },
    { value: 'apps', label: 'Приложения' },
    { value: 'presentations', label: 'Презентации' }
  ];
  
  return (
    <Card className="glass-effect">
      <CardBody className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Название работы"
                placeholder="Введите название работы"
                value={formData.title}
                onValueChange={(value) => handleChange('title', value)}
                variant="bordered"
                className="text-white"
                isRequired
              />
            </div>
            
            <div>
              <Select
                label="Категория"
                placeholder="Выберите категорию"
                selectedKeys={[formData.category || '']}
                onChange={(e) => handleChange('category', e.target.value as WorkCategory)}
                className="text-white"
                variant="bordered"
                isRequired
              >
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            
            <div>
              <Input
                label="Дата"
                type="date"
                value={formData.date}
                onValueChange={(value) => handleChange('date', value)}
                variant="bordered"
                className="text-white"
                isRequired
              />
            </div>
            
            <div>
              <Input
                label="Теги (через запятую)"
                placeholder="дизайн, логотип, брендинг"
                value={formData.tags?.join(', ') || ''}
                onValueChange={(value) => handleChange('tags', value.split(',').map(tag => tag.trim()))}
                variant="bordered"
                className="text-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <Textarea
                label="Описание"
                placeholder="Введите описание работы"
                value={formData.description}
                onValueChange={(value) => handleChange('description', value)}
                variant="bordered"
                className="text-white"
                minRows={4}
                isRequired
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-white text-sm mb-2">Изображение</label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="glass-effect border border-dashed border-white/30 rounded-lg p-4 flex flex-col items-center justify-center h-32">
                      <Icon icon="lucide:upload" className="text-white/70 text-2xl mb-2" />
                      <p className="text-white/70 text-sm">Перетащите файл или нажмите для выбора</p>
                    </div>
                  </div>
                </div>
                
                {imagePreview && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Предпросмотр"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              variant="flat"
              color="danger"
              onPress={() => history.push('/admin/dashboard')}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isSubmitting}
              startContent={!isSubmitting && <Icon icon="lucide:save" />}
            >
              {isEditMode ? 'Обновить' : 'Сохранить'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default WorkForm;