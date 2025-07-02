import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import SectionTitle from './section-title';
import SocialIcon from './social-icon';

const socialNetworks = [
  {
    name: 'Instagram',
    icon: 'lucide:instagram',
    qrCodeUrl: '/src/assets/qr-instagram.png'
  },
  {
    name: 'Telegram',
    icon: 'lucide:send',
    qrCodeUrl: '/src/assets/qr-telegram.png'
  },
  {
    name: 'WhatsApp',
    icon: 'lucide:phone',
    qrCodeUrl: '/src/assets/qr-whatsapp.png'
  },
  {
    name: 'Email',
    icon: 'lucide:mail',
    qrCodeUrl: '/src/assets/qr-email.png'
  }
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16">
      <SectionTitle 
        title="Связаться со мной" 
        subtitle="Отсканируйте QR-код для быстрой связи через любой удобный для вас канал"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialNetworks.map((social, index) => (
          <SocialIcon 
            key={index}
            icon={social.icon}
            name={social.name}
            qrCodeUrl={social.qrCodeUrl}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12"
      >
        <Card className="glass-effect">
          <CardBody className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-white text-xl font-semibold mb-3">Давайте обсудим ваш проект</h3>
                <p className="text-white/70 mb-4">
                  Готов помочь воплотить ваши идеи в жизнь. Свяжитесь со мной для консультации и обсуждения деталей вашего проекта.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:mail" className="text-primary" />
                    <span className="text-white">email@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:phone" className="text-primary" />
                    <span className="text-white">+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:map-pin" className="text-primary" />
                    <span className="text-white">Москва, Россия</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                  <Icon icon="lucide:map" className="text-primary text-6xl" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
};

export default ContactSection;