import React from "react";
import { Card, CardBody, Input, Textarea, Button, Switch, addToast } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const AdminSettings: React.FC = () => {
  const [name, setName] = React.useState("Иван Иванов");
  const [email, setEmail] = React.useState("ivan@example.com");
  const [phone, setPhone] = React.useState("+7 (999) 123-45-67");
  const [about, setAbout] = React.useState("Дизайнер и разработчик с 5-летним опытом создания цифровых продуктов.");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      addToast({
        title: "Настройки сохранены",
        description: "Ваши изменения успешно применены",
        color: "success",
      });
      
      setIsSubmitting(false);
      setPassword("");
      setConfirmPassword("");
    }, 1500);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Настройки</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-effect border border-white/10 mb-6">
            <CardBody>
              <h2 className="text-xl font-semibold mb-6">Личная информация</h2>
              
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Имя"
                    placeholder="Введите ваше имя"
                    value={name}
                    onValueChange={setName}
                    variant="bordered"
                    isRequired
                  />
                  
                  <Input
                    label="Email"
                    placeholder="Введите ваш email"
                    value={email}
                    onValueChange={setEmail}
                    type="email"
                    variant="bordered"
                    isRequired
                  />
                </div>
                
                <Input
                  label="Телефон"
                  placeholder="Введите ваш телефон"
                  value={phone}
                  onValueChange={setPhone}
                  variant="bordered"
                />
                
                <Textarea
                  label="О себе"
                  placeholder="Расскажите о себе"
                  value={about}
                  onValueChange={setAbout}
                  variant="bordered"
                  minRows={4}
                />
                
                <h3 className="text-lg font-medium mt-8 mb-4">Изменение пароля</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Новый пароль"
                    placeholder="Введите новый пароль"
                    value={password}
                    onValueChange={setPassword}
                    type="password"
                    variant="bordered"
                  />
                  
                  <Input
                    label="Подтверждение пароля"
                    placeholder="Подтвердите новый пароль"
                    value={confirmPassword}
                    onValueChange={setConfirmPassword}
                    type="password"
                    variant="bordered"
                    isInvalid={password !== confirmPassword && confirmPassword !== ""}
                    errorMessage={
                      password !== confirmPassword && confirmPassword !== ""
                        ? "Пароли не совпадают"
                        : ""
                    }
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    color="primary"
                    isLoading={isSubmitting}
                  >
                    Сохранить изменения
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          
          <Card className="glass-effect border border-white/10">
            <CardBody>
              <h2 className="text-xl font-semibold mb-6">Настройки сайта</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-medium">Уведомления</h3>
                    <p className="text-sm text-foreground/70">
                      Получать уведомления о новых сообщениях
                    </p>
                  </div>
                  <Switch 
                    isSelected={notifications}
                    onValueChange={setNotifications}
                    color="primary"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-medium">Темный режим</h3>
                    <p className="text-sm text-foreground/70">
                      Использовать темную тему для админ-панели
                    </p>
                  </div>
                  <Switch 
                    isSelected={darkMode}
                    onValueChange={setDarkMode}
                    color="primary"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="glass-effect border border-white/10 mb-6">
            <CardBody className="flex flex-col items-center text-center p-6">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Icon icon="lucide:user" className="w-12 h-12 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-foreground/70 mb-4">Администратор</p>
              
              <Button 
                variant="flat" 
                color="primary"
                className="w-full"
                startContent={<Icon icon="lucide:upload" />}
              >
                Загрузить фото
              </Button>
            </CardBody>
          </Card>
          
          <Card className="glass-effect border border-white/10">
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">Справка</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:book-open" className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Документация</h4>
                    <p className="text-sm text-foreground/70">
                      Подробная инструкция по использованию админ-панели
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:help-circle" className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Поддержка</h4>
                    <p className="text-sm text-foreground/70">
                      Свяжитесь с нами, если у вас возникли вопросы
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon icon="lucide:refresh-cw" className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Обновления</h4>
                    <p className="text-sm text-foreground/70">
                      Текущая версия: 1.0.0
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;