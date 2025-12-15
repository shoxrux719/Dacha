export const translations = {
  ru: {
    nav: { home: 'Главная', gallery: 'Галерея', amenities: 'Удобства', reviews: 'Отзывы', contacts: 'Контакты', booking: 'Бронирование' },
    hero: { title: 'Ваш идеальный загородный отдых', description: 'Тихое место для семейного отдыха: современный дом, ухоженный сад, бассейн и все удобства.', bookNow: 'Забронировать', viewGallery: 'Галерея' },
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
    hero: { title: 'Sizning mukammal dam olishingiz', description: 'Oila dam olishi uchun tinch joy: zamonaviy uy, basseyn va barcha qulayliklar.', bookNow: 'Bron qilish', viewGallery: 'Galereya' },
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

// Добавьте amenities в data.js
export const amenities = [
  { id: 1, icon: 'wifi', title: 'Wi-Fi', desc: 'Высокоскоростной интернет' },
  { id: 2, icon: 'swimming-pool', title: 'Бассейн', desc: 'С подогревом' },
  // ... остальные удобства
];
export const reviews = [
  { id: 1, name: "Анна С.", text: "Дети в восторге от бассейна!", rating: 5 },
  { id: 2, name: "Игорь М.", text: "Идеальное место для отдыха с друзьями.", rating: 5 },
  { id: 3, name: "Мария К.", text: "Прекрасное тихое место.", rating: 4 },
];
  export const galleryItems = [
  { id: 1, src: "https://api.dachaturizm.uz/media/estate_main_image/file.2023-07-25.20-01-08.jpeg", category: "house", title: "Главный дом" },
  { id: 2, src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994", category: "interior", title: "Гостиная" },
  { id: 3, src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7", category: "garden", title: "Сад" },
  { id: 4, src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00", category: "pool", title: "Бассейн" },
  { id: 5, src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", category: "interior", title: "Спальня" },
  { id: 6, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", category: "interior", title: "Кухня" },
];