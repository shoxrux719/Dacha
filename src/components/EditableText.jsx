import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import toast from 'react-hot-toast';

export const EditableText = ({ 
  section, 
  path, 
  value, 
  className, 
  element = 'span', 
  lang = 'ru', // Добавляем параметр языка
  ...props 
}) => {
  const { user } = useAuth();
  const { updateContent, updateTranslation, isAdminMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    // Если это перевод, используем специальную функцию
    if (section === 'translations') {
      // path будет в формате: "ru.hero.title"
      const [lang, category, key] = path.split('.');
      if (lang && category && key) {
        updateTranslation(lang, category, key, editValue);
      }
    } else {
      updateContent(section, path, editValue);
    }
    setIsEditing(false);
    toast.success('Текст сохранен');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if ((user?.isAdmin || isAdminMode) && isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`${className} bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-yellow-500`}
        {...props}
      />
    );
  }

  const Element = element;
  
  return (
    <div className="relative inline-block group">
      <Element
        className={`${className} ${(user?.isAdmin || isAdminMode) ? 'cursor-pointer hover:bg-yellow-50/30 dark:hover:bg-yellow-900/10 rounded-lg transition-colors' : ''}`}
        onDoubleClick={() => {
          if (user?.isAdmin || isAdminMode) {
            setIsEditing(true);
          }
        }}
        {...props}
      >
        {value}
      </Element>
      {(user?.isAdmin || isAdminMode) && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <i className="fas fa-edit text-sm text-yellow-500 hover:text-yellow-600"></i>
        </button>
      )}
    </div>
  );
};

// Компонент специально для переводов
export const EditableTranslation = ({ 
  lang, 
  category, 
  key, 
  className, 
  element = 'span', 
  ...props 
}) => {
  const { user } = useAuth();
  const { content, updateTranslation, isAdminMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  
  const value = content.translations?.[lang]?.[category]?.[key] || '';
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    updateTranslation(lang, category, key, editValue);
    setIsEditing(false);
    toast.success('Перевод сохранен');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if ((user?.isAdmin || isAdminMode) && isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`${className} bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-yellow-500`}
        {...props}
      />
    );
  }

  const Element = element;
  
  return (
    <div className="relative inline-block group">
      <Element
        className={`${className} ${(user?.isAdmin || isAdminMode) ? 'cursor-pointer hover:bg-yellow-50/30 dark:hover:bg-yellow-900/10 rounded-lg transition-colors' : ''}`}
        onDoubleClick={() => {
          if (user?.isAdmin || isAdminMode) {
            setIsEditing(true);
          }
        }}
        {...props}
      >
        {value}
      </Element>
      {(user?.isAdmin || isAdminMode) && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <i className="fas fa-edit text-sm text-yellow-500 hover:text-yellow-600"></i>
        </button>
      )}
    </div>
  );
};