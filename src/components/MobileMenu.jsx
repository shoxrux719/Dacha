import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileMenu = ({ 
  isOpen, 
  onClose, 
  links = [], 
  t = {}, 
  lang = 'ru', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {}, 
  currency = 'USD', 
  setCurrency = () => {}, 
  colorScheme = 'emerald', 
  setColorScheme = () => {}, 
  colorSchemes = [
    { name: 'Изумрудный', value: 'emerald', colors: ['#10B981', '#059669'] },
    { name: 'Синий', value: 'blue', colors: ['#3B82F6', '#1D4ED8'] },
    { name: 'Фиолетовый', value: 'purple', colors: ['#8B5CF6', '#7C3AED'] },
    { name: 'Розовый', value: 'pink', colors: ['#EC4899', '#DB2777'] },
    { name: 'Оранжевый', value: 'orange', colors: ['#F97316', '#EA580C'] },
  ]
}) => {
  const getIcon = (key) => {
    const icons = { 
      home: 'home', 
      gallery: 'images', 
      amenities: 'wifi', 
      reviews: 'star', 
      booking: 'calendar',
      contacts: 'phone'
    };
    return icons[key] || 'circle';
  };

  const currencyOptions = ['USD', 'UZS', 'EUR', 'RUB'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-gray-900 z-50 shadow-2xl p-6 flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-display font-bold text-xl dark:text-white">Меню</span>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <i className="fas fa-times text-xl text-gray-600 dark:text-gray-300"></i>
              </button>
            </div>

            {/* Настройки в мобильном меню */}
            <div className="mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <i className="fas fa-cog"></i> Настройки
              </h3>
              
              <div className="space-y-4">
                {/* Язык */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Язык</label>
                  <div className="flex gap-2">
                    {['ru', 'uz'].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          onClose(); // Закрыть меню после выбора
                        }}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium ${
                          lang === l 
                            ? 'bg-accent text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Валюта */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Валюта</label>
                  <select 
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      onClose(); // Закрыть меню после выбора
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white border-none text-sm"
                  >
                    {currencyOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Тема */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Тема</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        toggleTheme();
                        onClose(); // Закрыть меню после выбора
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-300 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      {theme === 'light' ? (
                        <>
                          <i className="fas fa-moon"></i> Темная
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sun"></i> Светлая
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Цветовая схема */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Цвет</label>
                  <div className="flex gap-2 flex-wrap">
                    {colorSchemes.map((scheme) => (
                      <button
                        key={scheme.value}
                        onClick={() => {
                          setColorScheme(scheme.value);
                          onClose(); // Закрыть меню после выбора
                        }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div 
                          className={`w-8 h-8 rounded-full border-2 ${
                            colorScheme === scheme.value 
                              ? 'border-gray-900 dark:border-white' 
                              : 'border-transparent'
                          }`}
                          style={{ background: scheme.colors[0] }}
                        />
                        <span className="text-xs dark:text-white">{scheme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <nav className="flex flex-col gap-4">
              {links.map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  onClick={onClose}
                  className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-accent transition-colors flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <i className={`fas fa-${getIcon(item)} w-6 text-accent`}></i>
                  {t[item] || item}
                </a>
              ))}
            </nav>
            
            <div className="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-center gap-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-accent transition-colors" onClick={onClose}>
                  <i className="fab fa-telegram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors" onClick={onClose}>
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors" onClick={onClose}>
                  <i className="fab fa-facebook text-xl"></i>
                </a>
              </div>
              <p className="text-sm text-gray-400 text-center">© 2024 Dacha Retreat</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};