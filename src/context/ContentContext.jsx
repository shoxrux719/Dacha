import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Инициализируем переводы внутри контекста
const initialTranslations = {
  ru: {
    nav: { home: 'Главная', gallery: 'Галерея', amenities: 'Удобства', reviews: 'Отзывы', contacts: 'Контакты', booking: 'Бронирование' },
    hero: { 
      title: 'Ваш идеальный загородный отдых', 
      description: 'Тихое место для семейного отдыха: современный дом, ухоженный сад, бассейн и все удобства.', 
      bookNow: 'Забронировать', 
      viewGallery: 'Галерея' 
    },
    booking: { 
      title: 'Бронирование', 
      perNight: '/ ночь', 
      checkIn: 'Заезд', 
      checkOut: 'Выезд', 
      guests: 'Гости', 
      total: 'Итого', 
      bookBtn: 'Забронировать',
      error: 'Выберите корректные даты',
      success: 'Бронь создана!'
    },
    gallery: { title: 'Галерея', desc: 'Посмотрите фото нашего дома' },
    amenities: { title: 'Удобства', desc: 'Все для комфортного отдыха' },
    reviews: { title: 'Отзывы', desc: 'Что говорят наши гости' },
    footer: { rights: 'Все права защищены' }
  },
  uz: {
    nav: { home: 'Bosh sahifa', gallery: 'Galereya', amenities: 'Qulayliklar', reviews: 'Sharhlar', contacts: 'Aloqa', booking: 'Bron qilish' },
    hero: { 
      title: 'Sizning mukammal dam olishingiz', 
      description: 'Oila dam olishi uchun tinch joy: zamonaviy uy, basseyn va barcha qulayliklar.', 
      bookNow: 'Bron qilish', 
      viewGallery: 'Galereya' 
    },
    booking: { 
      title: 'Bron qilish', 
      perNight: '/ kecha', 
      checkIn: 'Kirish', 
      checkOut: 'Chiqish', 
      guests: 'Mehmonlar', 
      total: 'Jami', 
      bookBtn: 'Bron qilish',
      error: "To'g'ri sanalarni tanlang",
      success: 'Bron yaratildi!'
    },
    gallery: { title: 'Galereya', desc: 'Uyimiz rasmlarini ko\'ring' },
    amenities: { title: 'Qulayliklar', desc: 'Qulay dam olish uchun barcha sharoitlar' },
    reviews: { title: 'Sharhlar', desc: 'Mehmonlarimiz fikrlari' },
    footer: { rights: 'Barcha huquqlar himoyalangan' }
  }
};

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    translations: initialTranslations,  // Добавляем переводы сюда
    gallery: [
      { id: 1, src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233", category: "house", title: "Главный дом" },
      { id: 2, src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994", category: "interior", title: "Гостиная" },
      { id: 3, src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7", category: "garden", title: "Сад" },
      { id: 4, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00", category: "pool", title: "Бассейн" },
      { id: 5, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", category: "interior", title: "Спальня" },
      { id: 6, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", category: "interior", title: "Кухня" },
    ],
    amenities: [
      { icon: 'wifi', title: 'Wi-Fi', desc: 'Высокоскоростной интернет' },
      { icon: 'swimming-pool', title: 'Бассейн', desc: 'С подогревом, работает круглый год' },
      { icon: 'hot-tub', title: 'Джакузи', desc: 'Гидромассажная ванна на 4 человека' },
      { icon: 'grill', title: 'Мангал', desc: 'Угольный гриль с аксессуарами' },
      { icon: 'kitchen-set', title: 'Кухня', desc: 'Полностью оборудованная техникой' },
      { icon: 'car', title: 'Парковка', desc: 'Крытая парковка на 2 авто' },
      { icon: 'tree', title: 'Сад', desc: 'Ухоженный фруктовый сад' },
      { icon: 'fire', title: 'Камин', desc: 'Натуральный дровяной камин' },
      { icon: 'tv', title: 'Кинотеатр', desc: 'Проектор с Netflix и Apple TV' },
      { icon: 'gamepad', title: 'Игры', desc: 'PlayStation 5 и настольные игры' },
      { icon: 'snowflake', title: 'Кондиционер', desc: 'Во всех комнатах' },
      { icon: 'washing-machine', title: 'Прачечная', desc: 'Стиральная и сушильная машины' },
    ],
    reviews: [
      { id: 1, name: "Анна Смирнова", text: "Прекрасное место для семейного отдыха! Дети в восторге от бассейна, взрослые - от уютной веранды и камина. Обязательно вернемся!", rating: 5, date: "15.03.2024" },
      { id: 2, name: "Игорь Петров", text: "Идеальное место для отдыха с друзьями. Большая территория, все удобства на высшем уровне. Особенно понравилась баня!", rating: 5, date: "02.03.2024" },
      { id: 3, name: "Мария Козлова", text: "Прекрасное тихое место. Отличный вид из окон, ухоженный сад. Персонал очень внимательный и отзывчивый.", rating: 4, date: "28.02.2024" },
      { id: 4, name: "Александр Иванов", text: "Отдыхали большой компанией. Все были в восторге! Дом очень чистый и уютный, есть все необходимое. Рекомендую!", rating: 5, date: "20.02.2024" },
    ],
    prices: {
      usd: 120,
      uzs: 1430000,
      eur: 110,
      rub: 11040
    },
    contact: {
      phone: '+998 (90) 123-45-67',
      email: 'info@dacharetreat.uz',
      address: 'Чорвонский район, село Заркайнар, ул. Дачная 45'
    }
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedContent = localStorage.getItem('dacha_content');
    const savedAdminMode = localStorage.getItem('admin_mode');
    
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        
        // Мерджим сохраненный контент с начальным, чтобы сохранить структуру
        const mergedContent = {
          translations: {
            ru: { ...initialTranslations.ru, ...parsedContent.translations?.ru },
            uz: { ...initialTranslations.uz, ...parsedContent.translations?.uz }
          },
          gallery: parsedContent.gallery || content.gallery,
          amenities: parsedContent.amenities || content.amenities,
          reviews: parsedContent.reviews || content.reviews,
          prices: parsedContent.prices || content.prices,
          contact: parsedContent.contact || content.contact
        };
        
        setContent(mergedContent);
      } catch (error) {
        console.error('Ошибка при загрузке сохраненного контента:', error);
      }
    }
    
    if (savedAdminMode === 'true') {
      setIsAdminMode(true);
    }
    
    setLoading(false);
  }, []);

  // Функция для обновления переводов
  const updateTranslation = (lang, category, key, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      
      if (!newContent.translations[lang]) {
        newContent.translations[lang] = {};
      }
      if (!newContent.translations[lang][category]) {
        newContent.translations[lang][category] = {};
      }
      
      newContent.translations[lang][category][key] = value;
      localStorage.setItem('dacha_content', JSON.stringify(newContent));
      return newContent;
    });
  };

  // Функция для глубокого обновления контента
  const updateContent = (section, path, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent[section];
      
      // Проходим по всем ключам кроме последнего
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Устанавливаем значение для последнего ключа
      current[keys[keys.length - 1]] = value;
      localStorage.setItem('dacha_content', JSON.stringify(newContent));
      return newContent;
    });
  };

  const updateGalleryImage = (index, field, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      if (newContent.gallery[index]) {
        newContent.gallery[index][field] = value;
        localStorage.setItem('dacha_content', JSON.stringify(newContent));
      }
      return newContent;
    });
  };

  const updateAmenity = (index, field, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      if (newContent.amenities[index]) {
        newContent.amenities[index][field] = value;
        localStorage.setItem('dacha_content', JSON.stringify(newContent));
      }
      return newContent;
    });
  };

  const updateReview = (index, field, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      if (newContent.reviews[index]) {
        newContent.reviews[index][field] = value;
        localStorage.setItem('dacha_content', JSON.stringify(newContent));
      }
      return newContent;
    });
  };

  const updatePrice = (currency, value) => {
    setContent(prev => {
      const newContent = { ...prev };
      newContent.prices[currency] = Number(value);
      localStorage.setItem('dacha_content', JSON.stringify(newContent));
      return newContent;
    });
  };

  const saveChanges = () => {
    localStorage.setItem('dacha_content', JSON.stringify(content));
    toast.success('Все изменения сохранены!');
  };

  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    setIsAdminMode(newMode);
    localStorage.setItem('admin_mode', newMode.toString());
    
    if (newMode) {
      toast.success('Режим администратора включен');
    } else {
      toast('Режим администратора выключен', { icon: '👋' });
    }
  };

    
  // Функция для безопасного получения перевода
  const getTranslation = (lang, category, key) => {
    return content.translations?.[lang]?.[category]?.[key] || key;
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent,
      updateTranslation,
      updateGalleryImage,
      updateAmenity,
      updateReview,
      updatePrice,
      saveChanges,
      getTranslation,
      isAdminMode,
      toggleAdminMode,
      loading
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent должен использоваться внутри ContentProvider');
  }
  return context;
};