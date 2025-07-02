import React from "react";
import { Card, CardBody, Input, Textarea, Button, addToast } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const ContactForm: React.FC = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      addToast({
        title: "Сообщение отправлено",
        description: "Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.",
        color: "success",
      });
      
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/10 to-black" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-red-600/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">ОСТАЛИСЬ</span> <span className="text-gradient">ВОПРОСЫ?</span>
          </h2>
          <div className="h-1 w-24 bg-red-500 mx-auto mt-4 mb-8"></div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Есть проект или идея? Напишите мне, и я свяжусь с вами в ближайшее время.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-black/40 backdrop-blur-md border border-white/10">
              <CardBody className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input
                      label="ВАШЕ ИМЯ"
                      placeholder="Введите ваше имя"
                      value={name}
                      onValueChange={setName}
                      variant="bordered"
                      isRequired
                      classNames={{
                        label: "text-white/70 text-xs tracking-wider font-medium",
                        input: "text-white",
                        inputWrapper: "border-white/20 hover:border-red-500/50 bg-transparent"
                      }}
                      startContent={<Icon icon="lucide:user" className="text-white/50" />}
                    />
                    
                    <Input
                      label="EMAIL"
                      placeholder="Введите ваш email"
                      value={email}
                      onValueChange={setEmail}
                      variant="bordered"
                      type="email"
                      isRequired
                      classNames={{
                        label: "text-white/70 text-xs tracking-wider font-medium",
                        input: "text-white",
                        inputWrapper: "border-white/20 hover:border-red-500/50 bg-transparent"
                      }}
                      startContent={<Icon icon="lucide:mail" className="text-white/50" />}
                    />
                  </div>
                  
                  <Textarea
                    label="СООБЩЕНИЕ"
                    placeholder="Расскажите о вашем проекте или задайте вопрос"
                    value={message}
                    onValueChange={setMessage}
                    variant="bordered"
                    minRows={5}
                    isRequired
                    classNames={{
                      label: "text-white/70 text-xs tracking-wider font-medium",
                      input: "text-white",
                      inputWrapper: "border-white/20 hover:border-red-500/50 bg-transparent"
                    }}
                  />
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      color="primary"
                      className="px-8 py-6 text-lg rounded-none border-2 border-red-500 bg-transparent hover:bg-red-500/20 transition-all duration-300"
                      isLoading={isSubmitting}
                      startContent={!isSubmitting && <Icon icon="lucide:send" className="mr-2" />}
                    >
                      ОТПРАВИТЬ СООБЩЕНИЕ
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;