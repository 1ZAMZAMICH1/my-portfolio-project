// src/components/footer.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              {/* Логотип-изображение */}
              <img
                src="https://res.cloudinary.com/dyuywnfy3/image/upload/v1749157242/ZAMZAMICH_LOGO_WHITE_p78cra.png"
                alt="ZAMZAMICH Logo"
                className="h-11 w-auto" // Высота 40px, ширина автоматически
              />
              {/* Текстовая надпись ZAMZAMICH */}
              <span className="font-bold text-2xl text-white">ZAMZAMICH</span>
            </div>
            <p className="text-white/60 mb-6 max-w-xs">
              Создаю уникальные дизайны и разрабатываю современные цифровые решения для амбициозных проектов.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">НАВИГАЦИЯ</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/works/design" className="text-white/60 hover:text-red-500 transition-colors">
                  Графический дизайн
                </Link>
              </li>
              <li>
                <Link to="/works/websites" className="text-white/60 hover:text-red-500 transition-colors">
                  Веб-сайты
                </Link>
              </li>
              <li>
                <Link to="/works/apps" className="text-white/60 hover:text-red-500 transition-colors">
                  Приложения
                </Link>
              </li>
              <li>
                <Link to="/works/presentations" className="text-white/60 hover:text-red-500 transition-colors">
                  Презентации
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">КОНТАКТЫ</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ВАШ_EMAIL@example.com" className="text-white/60 hover:text-red-500 transition-colors flex items-center gap-2">
                  <Icon icon="lucide:mail" className="w-5 h-5" /> edgaaarrr@mail.ru {/* ЗАМЕНИТЕ НА ВАШ EMAIL */}
                </a>
              </li>
              <li>
                <a href="tel:+ВАШ_НОМЕР_ТЕЛЕФОНА" className="text-white/60 hover:text-red-500 transition-colors flex items-center gap-2">
                  <Icon icon="lucide:phone" className="w-5 h-5" /> +77021582932 {/* ЗАМЕНИТЕ НА ВАШ ТЕЛЕФОН */}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-red-500 transition-colors flex items-center gap-2">
                  <Icon icon="lucide:map-pin" className="w-5 h-5" /> Шымкент {/* ЗАМЕНИТЕ НА ВАШ АДРЕС */}
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="ВАША_ССЫЛКА_НА_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors">
                <Icon icon="lucide:instagram" className="w-5 h-5" />
              </a>
              <a href="ВАША_ССЫЛКА_НА_TWITTER" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors">
                <Icon icon="lucide:twitter" className="w-5 h-5" />
              </a>
              <a href="ВАША_ССЫЛКА_НА_GITHUB" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors">
                <Icon icon="lucide:github" className="w-5 h-5" />
              </a>
              <a href="ВАША_ССЫЛКА_НА_LINKEDIN" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors">
                <Icon icon="lucide:linkedin" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} Все права защищены
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="text-white/50 text-sm hover:text-red-500 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="#" className="text-white/50 text-sm hover:text-red-500 transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;