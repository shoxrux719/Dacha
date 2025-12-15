import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import toast from 'react-hot-toast';

export const EditableImage = ({ src, alt, className, index, field, ...props }) => {
  const { user } = useAuth();
  const { updateGalleryImage, isAdminMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(src);

  const handleSave = () => {
    updateGalleryImage(index, field, editValue);
    setIsEditing(false);
    toast.success('Изображение обновлено');
  };

  if ((user?.isAdmin || isAdminMode) && isEditing) {
    return (
      <div className="relative">
        <img
          src={editValue}
          alt={alt}
          className={className}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Ошибка+загрузки';
          }}
        />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-3 rounded-lg mb-3 bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Введите URL изображения"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Сохранить
            </button>
            <button
              onClick={() => {
                setEditValue(src);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className={className}
        {...props}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x300?text=Ошибка+загрузки';
        }}
      />
      {(user?.isAdmin || isAdminMode) && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
          title="Изменить изображение"
        >
          <i className="fas fa-camera text-sm"></i>
        </button>
      )}
    </div>
  );
};