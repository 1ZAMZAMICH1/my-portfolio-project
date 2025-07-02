// src/components/social-links.tsx

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react"; 

// Обновленный тип для SocialLink
type SocialLink = {
  name: string;
  icon: string; // Это свойство теперь опционально, т.к. иконки lucide не будут отображаться
  color: string; // Это свойство для градиентного фона карточки
  url: string; // Ссылка, куда ведет карточка при клике
  imgSrc: string; // <--- НОВОЕ СВОЙСТВО: Ссылка на изображение QR-кода или любого другого изображения
};

// ОБНОВИТЕ ЭТОТ МАССИВ ВАШИМИ ССЫЛКАМИ НА ИЗОБРАЖЕНИЯ И ССЫЛКАМИ ДЛЯ ПЕРЕХОДА
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    icon: "lucide:instagram", // Можно удалить, если не используется для чего-то еще
    color: "from-pink-500 to-orange-500",
    url: "https://www.instagram.com/mcciahha.oos/", // Ссылка, куда ведет карточка/QR-код при клике
    imgSrc: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1749218362/%D0%BC%D0%B0%D1%8B%D0%B2_ipzrtv.png", // <--- ВСТАВЬТЕ СЮДА ПРЯМУЮ ССЫЛКУ НА ВАШЕ ИЗОБРАЖЕНИЕ QR-кода
  },
  {
    name: "WhatsApp",
    icon: "lucide:whatsapp",
    color: "from-green-400 to-green-600",
    url: "https://wa.me/+77021582932",
    imgSrc: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1749218704/%D0%BC%D1%81%D0%B8%D0%BF_cseavm.png", // <--- ВСТАВЬТЕ СЮДА ПРЯМУЮ ССЫЛКУ НА ВАШЕ ИЗОБРАЖЕНИЕ QR-кода
  },
  {
    name: "Telegram",
    icon: "lucide:send",
    color: "from-blue-400 to-blue-600",
    url: "https://t.me/@minerofyourhearts",
    imgSrc: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1749218359/%D1%86%D1%83%D0%BA%D0%B5_a6c9lf.png", // <--- ВСТАВЬТЕ СЮДА ПРЯМУЮ ССЫЛКУ НА ВАШЕ ИЗОБРАЖЕНИЕ QR-кода
  },
  {
    name: "Вконтакте", // Или любое другое название, например "Свяжитесь со мной"
    icon: "lucide:mail",
    color: "from-gray-700 to-gray-900",
    url: "https://vk.com/minerofyourhearts",
    imgSrc: "https://res.cloudinary.com/dyuywnfy3/image/upload/v1749218706/%D0%B0%D0%B2%D0%BF%D0%B2%D0%B0%D0%BF_zr4xky.png", // <--- ВСТАВЬТЕ СЮДА ПРЯМУЮ ССЫЛКУ НА ВАШЕ ИЗОБРАЖЕНИЕ QR-кода
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SocialLinks: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-gradient">СОЦИАЛЬНЫЕ СЕТИ</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Отсканируйте QR-коды для быстрого доступа или нажмите, чтобы перейти по ссылке.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.div key={social.name} variants={item}>
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card
                  className={`bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden hover:border-red-500/50 transition-all duration-300 h-full`}
                  isPressable
                >
                  <CardBody className="p-0 flex flex-col justify-between">
                    {/* Изображение QR-кода по прямой ссылке */}
                    <div className="aspect-square w-full bg-white p-3 flex items-center justify-center">
                      <img
                        src={social.imgSrc} // <--- ВОТ ЗДЕСЬ ВСТАВЛЯЕТСЯ ВАША ПРЯМАЯ ССЫЛКА НА ИЗОБРАЖЕНИЕ
                        alt={`QR код ${social.name}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-medium text-white">{social.name}</h3>
                    </div>
                  </CardBody>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialLinks;