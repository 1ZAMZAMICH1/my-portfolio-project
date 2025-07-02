import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface SocialIconProps {
  icon: string;
  name: string;
  qrCodeUrl: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, name, qrCodeUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="social-icon-container glass-effect rounded-lg p-4 flex flex-col items-center gap-3"
    >
      <img 
        src={qrCodeUrl} 
        alt={`QR код ${name}`} 
        className="w-32 h-32 rounded-md"
      />
      <div className="flex items-center gap-2">
        <Icon icon={icon} className="text-primary text-xl" />
        <span className="text-white font-medium">{name}</span>
      </div>
    </motion.div>
  );
};

export default SocialIcon;