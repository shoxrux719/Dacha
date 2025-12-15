import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import toast from 'react-hot-toast';

export const EditablePrice = ({ currency, value, className, ...props }) => {
  const { user } = useAuth();
  const { updatePrice, isAdminMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    updatePrice(currency, editValue);
    setIsEditing(false);
    toast.success('Цена обновлена');
  };

  const formatPrice = (price) => {
    if (currency === 'usd') return `$${price.toLocaleString()}`;
    if (currency === 'uzs') return `${price.toLocaleString()} сум`;
    if (currency === 'eur') return `€${price.toLocaleString()}`;
    if (currency === 'rub') return `${price.toLocaleString()} ₽`;
    return price;
  };

  if ((user?.isAdmin || isAdminMode) && isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Number(e.target.value))}
          className={`${className} bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-yellow-500`}
          autoFocus
        />
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
        >
          ✓
        </button>
        <button
          onClick={() => {
            setEditValue(value);
            setIsEditing(false);
          }}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="relative inline-block group">
      <span
        className={`${className} ${(user?.isAdmin || isAdminMode) ? 'cursor-pointer hover:bg-yellow-50/30 dark:hover:bg-yellow-900/10 rounded-lg transition-colors' : ''}`}
        onDoubleClick={() => {
          if (user?.isAdmin || isAdminMode) {
            setIsEditing(true);
          }
        }}
        {...props}
      >
        {formatPrice(value)}
      </span>
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
