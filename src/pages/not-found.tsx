import React from "react";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pearlescent-gradient flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6">
          <Icon icon="lucide:alert-circle" className="w-20 h-20 text-primary mx-auto" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
        <p className="text-foreground/70 mb-8">
          Извините, но страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Button 
          as={Link} 
          to="/" 
          color="primary"
          size="lg"
          startContent={<Icon icon="lucide:home" />}
        >
          Вернуться на главную
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;