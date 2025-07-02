import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import AdminSidebar from "../../components/admin/admin-sidebar";
import AdminDashboardHome from "./dashboard-home";
import AdminWorksList from "./works-list";
import AdminWorkForm from "././work-form"; // Обрати внимание на '././' - это из твоего файла, если так и есть
import AdminSettings from "./settings";
import AdminGalleryPage from "./gallery";

const AdminDashboardPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }

    // START: Добавленный JavaScript для удаления проблемных элементов ТОЛЬКО на админке
    const removeProblematicElements = () => {
      // Удаляем .data-overlay-container, если он вдруг появится (хотя теперь он не должен грузиться)
      const dataOverlay = document.querySelector('.data-overlay-container');
      if (dataOverlay) {
        dataOverlay.remove();
        console.log('Removed .data-overlay-container from Admin.');
      }

      // Удаляем react-resizable-handle SVG
      const resizableHandle = document.querySelector('.react-resizable-handle');
      if (resizableHandle) {
        resizableHandle.remove();
        console.log('Removed .react-resizable-handle from Admin.');
      }
      // Продолжаем попытки, так как элементы могут появляться динамически
      requestAnimationFrame(removeProblematicElements);
    };

    // Запускаем удаление, когда компонент монтируется
    const animationFrameId = requestAnimationFrame(removeProblematicElements);

    // Очищаем, когда компонент размонтируется, чтобы не было утечек памяти
    return () => cancelAnimationFrame(animationFrameId);
    // END: Добавленный JavaScript
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    // START: Изменена строка: убираем pearlescent-gradient, оставляем bg-black
    <div className="min-h-screen bg-black flex">
    // END: Изменена строка
      <div className="w-64 h-screen sticky top-0">
        <AdminSidebar />
      </div>

      <div className="flex-grow p-6">
        <Routes>
          <Route index element={<AdminDashboardHome />} />
          <Route path="design" element={<AdminWorksList category="design" />} />
          <Route path="websites" element={<AdminWorksList category="websites" />} />
          <Route path="apps" element={<AdminWorksList category="apps" />} />
          <Route path="presentations" element={<AdminWorksList category="presentations" />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="create/:category" element={<AdminWorkForm />} />
          <Route path="edit/:id" element={<AdminWorkForm />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardPage;