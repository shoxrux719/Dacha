import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { differenceInDays, addDays, format, parseISO } from 'date-fns';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider, useContent } from './context/ContentContext';
import { EditableText } from './components/EditableText';
import { EditableImage } from './components/EditableImage';
import { EditablePrice } from './components/EditablePrice';
import { MobileMenu } from './components/MobileMenu';

// =============== INITIAL TRANSLATIONS ===============
const initialTranslations = {
  ru: {
    nav: {
      home: 'Главная',
      gallery: 'Галерея',
      amenities: 'Удобства',
      reviews: 'Отзывы',
      booking: 'Бронирование'
    },
    hero: {
      title: 'Загородный отдых премиум-класса',
      description: 'Уютный дом в живописном месте с современными удобствами для вашего идеального отдыха',
      bookNow: 'Забронировать сейчас',
      viewGallery: 'Посмотреть галерею'
    },
    booking: {
      title: 'Бронирование',
      checkIn: 'Заезд',
      checkOut: 'Выезд',
      guests: 'Гости',
      perNight: 'за ночь',
      total: 'Итого',
      bookBtn: 'Забронировать',
      error: 'Выберите корректные даты',
      success: 'Бронь создана!'
    },
    gallery: {
      title: 'Наша галерея',
      desc: 'Посмотрите фотографии нашего уютного дома и территории'
    },
    amenities: {
      title: 'Удобства',
      desc: 'Все необходимое для комфортного отдыха'
    },
    reviews: {
      title: 'Отзывы гостей',
      desc: 'Что говорят наши посетители'
    },
    footer: {
      rights: 'Все права защищены'
    }
  },
  uz: {
    nav: {
      home: 'Бош саҳифа',
      gallery: 'Галерея',
      amenities: 'Қулайликлар',
      reviews: 'Шарҳлар',
      booking: 'Брон қилиш'
    },
    hero: {
      title: 'Премиум дам олиш маскан',
      description: 'Сизнинг идеал дам олишингиз учун замонавий қулайликларга эга ширин жой',
      bookNow: 'Ҳозир брон қилиш',
      viewGallery: 'Галереяни кўриш'
    },
    booking: {
      title: 'Брон қилиш',
      checkIn: 'Кириш',
      checkOut: 'Чиқиш',
      guests: 'Меҳмонлар',
      perNight: 'кечасига',
      total: 'Жами',
      bookBtn: 'Брон қилиш',
      error: 'Тўғри саналарни танланг',
      success: 'Брон яратилди!'
    },
    gallery: {
      title: 'Бизнинг галерея',
      desc: 'Бизнинг ширин уйимиз ва ҳовлимизнинг суратларини кўринг'
    },
    amenities: {
      title: 'Қулайликлар',
      desc: 'Қулай дам олиш учун барча зарур нарсалар'
    },
    reviews: {
      title: 'Меҳмонлар шарҳлари',
      desc: 'Бизнинг меҳмонларимиз нима дейди'
    },
    footer: {
      rights: 'Барча ҳуқуқлар ҳимояланган'
    }
  }
};

// =============== INITIAL CONTENT ===============
const initialContent = {
  translations: initialTranslations,
  prices: {
    usd: 120,
    eur: 110,
    rub: 9500,
    uzs: 1500000
  },
  gallery: [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      title: 'Гостиная с камином',
      category: 'Интерьер'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      title: 'Спальня с видом на сад',
      category: 'Интерьер'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
      title: 'Современная кухня',
      category: 'Интерьер'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      title: 'Терраса для отдыха',
      category: 'Территория'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?auto=format&fit=crop&w=800&q=80',
      title: 'Бассейн',
      category: 'Территория'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      title: 'Вход в дом',
      category: 'Экстерьер'
    }
  ],
  amenities: [
    {
      icon: 'wifi',
      title: 'Быстрый Wi-Fi',
      desc: 'Высокоскоростной интернет по всей территории'
    },
    {
      icon: 'snowflake',
      title: 'Кондиционер',
      desc: 'Во всех комнатах'
    },
    {
      icon: 'fire',
      title: 'Камин',
      desc: 'Уютные вечера у огня'
    },
    {
      icon: 'utensils',
      title: 'Полная кухня',
      desc: 'Вся необходимая техника и посуда'
    },
    {
      icon: 'swimming-pool',
      title: 'Бассейн',
      desc: 'Открытый бассейн с подогревом'
    },
    {
      icon: 'car',
      title: 'Парковка',
      desc: 'Охраняемая парковка для 4 автомобилей'
    },
    {
      icon: 'tv',
      title: 'Smart TV',
      desc: 'Телевизор с Netflix и YouTube'
    },
    {
      icon: 'grill',
      title: 'Зона BBQ',
      desc: 'Мангал и летняя кухня'
    }
  ],
  reviews: [
    {
      id: 1,
      name: 'Анна Петрова',
      text: 'Прекрасное место для отдыха всей семьей! Дом очень уютный, все необходимое есть. Особенно понравился бассейн и зона BBQ.',
      rating: 5,
      date: '15.10.2023'
    },
    {
      id: 2,
      name: 'Иван Сидоров',
      text: 'Отличное расположение, красивая природа вокруг. Интернет быстрый, что важно для работы. Обязательно вернемся!',
      rating: 5,
      date: '22.09.2023'
    },
    {
      id: 3,
      name: 'Мария Иванова',
      text: 'Идеальное место для уединения. Очень чисто, ухоженная территория. Хозяева внимательные, помогли со всеми вопросами.',
      rating: 4,
      date: '05.09.2023'
    },
    {
      id: 4,
      name: 'Дмитрий Кузнецов',
      text: 'Большой дом, вместилась компания из 6 человек. Есть все для комфортного проживания. Рекомендую!',
      rating: 5,
      date: '18.08.2023'
    }
  ],
  contact: {
    address: 'Чорвонский район, село Заркайнар',
    phone: '+998 (90) 123-45-67',
    email: 'info@dacharetreat.uz'
  }
};

// =============== SUB-COMPONENTS ===============

const BookingCard = ({ currency, t }) => {
  const { user } = useAuth();
  const { content, isAdminMode } = useContent();
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(2);
  const [total, setTotal] = useState(0);

  const getBasePrice = () => {
    const priceKey = currency.toLowerCase();
    return content.prices[priceKey] || 120;
  };

  const basePrice = getBasePrice();
  
  useEffect(() => {
    if (dates.checkIn && dates.checkOut) {
      try {
        const start = parseISO(dates.checkIn);
        const end = parseISO(dates.checkOut);
        const days = differenceInDays(end, start);
        
        if (days > 0) {
          setTotal(days * basePrice);
        } else {
          setTotal(0);
        }
      } catch (error) {
        setTotal(0);
      }
    }
  }, [dates, basePrice]);

  const formatPrice = (price) => {
    if (currency === 'USD') return `$${price.toLocaleString()}`;
    if (currency === 'EUR') return `€${price.toLocaleString()}`;
    if (currency === 'RUB') return `${price.toLocaleString()} ₽`;
    return `${price.toLocaleString()} сум`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user && !isAdminMode) {
      document.dispatchEvent(new CustomEvent('openAuth'));
      toast.error('Пожалуйста, войдите в аккаунт для бронирования');
      return;
    }
    if (!total || !dates.checkIn || !dates.checkOut) {
      toast.error(t.booking.error || 'Выберите корректные даты');
      return;
    }
    
    if (user?.isAdmin || isAdminMode) {
      toast.success('Администратор: бронь создана (тестовый режим)');
    } else {
      toast.success(t.booking.success || `Бронь создана! Ждем вас ${dates.checkIn}`);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl w-full max-w-lg mx-auto lg:mx-0"
    >
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          {t.booking.title}
        </h3>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold text-accent">
            <EditablePrice 
              currency={currency.toLowerCase()} 
              value={basePrice}
              className="inline-block"
            />
            <span className="text-xs text-gray-500 block">{t.booking.perNight}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">{t.booking.checkIn}</label>
            <input 
              type="date" 
              required
              value={dates.checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDates({...dates, checkIn: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-accent outline-none text-gray-800 dark:text-white text-sm" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">{t.booking.checkOut}</label>
            <input 
              type="date" 
              required
              value={dates.checkOut}
              min={dates.checkIn ? format(addDays(parseISO(dates.checkIn), 1), 'yyyy-MM-dd') : new Date().toISOString().split('T')[0]}
              onChange={(e) => setDates({...dates, checkOut: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-accent outline-none text-gray-800 dark:text-white text-sm" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">{t.booking.guests}</label>
          <select 
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-accent outline-none text-gray-800 dark:text-white"
          >
            {[1,2,3,4,5,6].map(n => (
              <option key={n} value={n}>{n} {t.booking.guests}</option>
            ))}
          </select>
        </div>

        {total > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-lg font-bold text-accent"
          >
            <span>{t.booking.total}:</span>
            <span>{formatPrice(total)}</span>
          </motion.div>
        )}

        <button 
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-accent to-green-600 hover:from-green-700 hover:to-accent text-white rounded-xl font-bold text-lg shadow-lg shadow-accent/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          {user?.isAdmin || isAdminMode ? 'Тестовая бронь (Админ)' : t.booking.bookBtn}
        </button>
      </form>
    </motion.div>
  );
};

const Header = ({ lang, setLang, currency, setCurrency, theme, toggleTheme, scrolled, activeSection }) => {
  const { user, logout } = useAuth();
  const { isAdminMode, toggleAdminMode, saveChanges, content } = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(false);

  const navLinks = ['home', 'gallery', 'amenities', 'reviews', 'booking'];
  const currencyOptions = ['USD', 'UZS', 'EUR', 'RUB'];

  const t = content.translations?.[lang]?.nav || {};

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      } ${isAdminMode ? 'border-t-4 border-yellow-500' : ''}`}>
        
        {/* Админ панель */}
        {isAdminMode && (
          <div className="bg-yellow-500 text-black py-2 px-4 text-sm font-bold">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
              <span>⚡ РЕЖИМ АДМИНИСТРАТОРА</span>
              <div className="flex gap-2">
                <button
                  onClick={saveChanges}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  💾 Сохранить все
                </button>
                <button
                  onClick={toggleAdminMode}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  ✕ Выйти из режима
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          <a href="#home" className="flex items-center gap-3 z-50">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
              isAdminMode 
                ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                : 'bg-gradient-to-br from-accent to-emerald-600'
            }`}>
              {isAdminMode ? 'A' : 'D'}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl text-gray-900 dark:text-white leading-tight">
                {isAdminMode ? 'ADMIN MODE' : 'Dacha Retreat'}
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex gap-8 bg-white/50 dark:bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/20">
            {navLinks.map((item) => (
              <a 
                key={item}
                href={`#${item}`}
                className={`text-sm font-semibold transition-colors relative ${
                  activeSection === item 
                    ? 'text-accent dark:text-accent' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent'
                }`}
              >
                {t[item]}
                {activeSection === item && (
                  <motion.div 
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              {/* Кнопка режима админа */}
              {user?.isAdmin && (
                <button
                  onClick={toggleAdminMode}
                  className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                    isAdminMode 
                      ? 'bg-yellow-500 text-black hover:bg-yellow-600' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {isAdminMode ? '⚡ АДМИН' : '👑 Админ'}
                </button>
              )}

              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-20 h-10 px-3 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-accent outline-none text-sm font-semibold dark:text-white"
              >
                {currencyOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              
              <button 
                onClick={() => setLang(lang === 'ru' ? 'uz' : 'ru')}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition font-bold text-xs dark:text-white"
              >
                {lang.toUpperCase()}
              </button>
              
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center"
              >
                {theme === 'light' ? (
                  <i className="fas fa-moon text-gray-600"></i>
                ) : (
                  <i className="fas fa-sun text-yellow-400"></i>
                )}
              </button>
            </div>

            {/* Мобильные настройки */}
            <div className="sm:hidden flex items-center gap-2">
              <button 
                onClick={() => setShowMobileSettings(!showMobileSettings)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
              >
                <i className="fas fa-cog text-gray-600 dark:text-gray-300"></i>
              </button>
            </div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:ring-2 ring-accent transition"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    user.isAdmin 
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-black' 
                      : 'bg-accent text-white'
                  }`}>
                    {user.isAdmin ? 'A' : user.name[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-bold hidden md:block dark:text-white">
                    {user.isAdmin ? 'Админ' : user.name.split(' ')[0]}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-500">
                          {user.isAdmin ? 'Администратор' : 'Пользователь'}
                        </p>
                        <p className="font-bold truncate text-sm dark:text-white">{user.email}</p>
                      </div>
                      {user.isAdmin && (
                        <button 
                          onClick={() => {
                            toggleAdminMode();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-sm font-bold flex items-center gap-2 transition-colors"
                        >
                          <i className="fas fa-crown"></i>
                          {isAdminMode ? 'Выключить режим админа' : 'Режим админа'}
                        </button>
                      )}
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-bold flex items-center gap-2 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt"></i> Выйти
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('openAuth'))}
                className="px-5 py-2.5 bg-accent hover:bg-emerald-700 text-white rounded-full font-bold text-sm shadow-lg shadow-accent/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Войти
              </button>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-800 dark:text-white"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Мобильные настройки панель */}
        <AnimatePresence>
          {showMobileSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Язык</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLang('ru')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${lang === 'ru' ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-white'}`}
                      >
                        RU
                      </button>
                      <button
                        onClick={() => setLang('uz')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${lang === 'uz' ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-white'}`}
                      >
                        UZ
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Валюта</label>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white border-none text-sm"
                    >
                      {currencyOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks} 
        t={t} 
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await register(formData.name, formData.email, formData.password);
    }

    setIsLoading(false);
    if (success) {
      onClose();
      setFormData({ name: '', email: '', password: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl p-8 shadow-2xl z-10 relative overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          <h2 className="text-3xl font-display font-bold text-center mb-2 dark:text-white">
            {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLogin ? 'Войдите в свой аккаунт' : 'Зарегистрируйтесь для бронирования'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input 
                type="text" 
                placeholder="Ваше имя" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-accent dark:text-white"
                disabled={isLoading}
              />
            )}
            
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-accent dark:text-white"
              disabled={isLoading}
            />
            
            <input 
              type="password" 
              placeholder="Пароль" 
              required
              minLength={6}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-accent dark:text-white"
              disabled={isLoading}
            />
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-accent hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i> Обработка...
                </span>
              ) : (
                isLogin ? 'Войти' : 'Зарегистрироваться'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading}
              className="text-gray-500 hover:text-accent font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти'}
            </button>
          </div>

          {/* Подсказка для администратора */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              Для входа как администратор: <br/>
              Email: <span className="font-mono">admin@dacha.com</span><br/>
              Пароль: <span className="font-mono">admin123</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GallerySection = () => {
  const { content, isAdminMode } = useContent();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <section id="gallery" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <EditableText 
            section="translations"
            path="ru.gallery.title"
            value="Наша галерея"
            element="h2"
            className="text-4xl md:text-5xl font-bold font-display mb-4 dark:text-white"
          />
          <EditableText 
            section="translations"
            path="ru.gallery.desc"
            value="Посмотрите фотографии нашего уютного дома и территории"
            element="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {content.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden cursor-pointer group relative ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(item)}
            >
              <EditableImage
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                index={index}
                field="src"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <EditableText 
                    section="gallery"
                    path={`${index}.title`}
                    value={item.title}
                    element="h3"
                    className="font-bold text-xl mb-2"
                  />
                  <p className="text-sm opacity-90">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="rounded-2xl max-h-[90vh] w-auto object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-bold text-xl">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AmenitiesSection = () => {
  const { content } = useContent();

  return (
    <section id="amenities" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <EditableText 
          section="translations"
          path="ru.amenities.title"
          value="Удобства"
          element="h2"
          className="text-4xl md:text-5xl font-bold font-display mb-4 dark:text-white"
        />
        <EditableText 
          section="translations"
          path="ru.amenities.desc"
          value="Все необходимое для комфортного отдыха"
          element="p"
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg"
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {content.amenities.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <i className={`fas fa-${item.icon} text-2xl text-accent`}></i>
            </div>
            <EditableText 
              section="amenities"
              path={`${index}.title`}
              value={item.title}
              element="h3"
              className="font-bold text-lg mb-2 dark:text-white"
            />
            <EditableText 
              section="amenities"
              path={`${index}.desc`}
              value={item.desc}
              element="p"
              className="text-gray-500 dark:text-gray-400 text-sm"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const { content } = useContent();

  return (
    <section id="reviews" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <EditableText 
          section="translations"
          path="ru.reviews.title"
          value="Отзывы гостей"
          element="h2"
          className="text-4xl md:text-5xl font-bold font-display mb-4 dark:text-white"
        />
        <EditableText 
          section="translations"
          path="ru.reviews.desc"
          value="Что говорят наши посетители"
          element="p"
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {content.reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                ></i>
              ))}
            </div>
            
            <EditableText 
              section="reviews"
              path={`${index}.text`}
              value={review.text}
              element="p"
              className="text-gray-600 dark:text-gray-300 mb-6 italic line-clamp-4"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center text-white font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <EditableText 
                    section="reviews"
                    path={`${index}.name`}
                    value={review.name}
                    element="h4"
                    className="font-bold dark:text-white"
                  />
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { content } = useContent();

  return (
    <section id="contacts" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 dark:text-white">
          Контакты
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Свяжитесь с нами для бронирования или вопросов
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-2xl text-accent"></i>
              </div>
              <div>
                <h3 className="font-bold text-xl dark:text-white">Адрес</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {content.contact.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <i className="fas fa-phone text-2xl text-accent"></i>
              </div>
              <div>
                <h3 className="font-bold text-xl dark:text-white">Телефон</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {content.contact.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <i className="fas fa-envelope text-2xl text-accent"></i>
              </div>
              <div>
                <h3 className="font-bold text-xl dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {content.contact.email}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <i className="fab fa-telegram"></i>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6 dark:text-white">Отправить сообщение</h3>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 focus:ring-accent dark:text-white"
            />
            <input 
              type="email" 
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 focus:ring-accent dark:text-white"
            />
            <textarea 
              placeholder="Сообщение"
              rows="4"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none outline-none focus:ring-2 focus:ring-accent dark:text-white resize-none"
            ></textarea>
            <button className="w-full py-4 bg-accent hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors">
              Отправить
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ t }) => {
  const { user } = useAuth();
  const { saveChanges } = useContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="font-display font-bold text-2xl">Dacha Retreat</span>
            </div>
            <p className="text-gray-400">
              Премиальный загородный отдых для вас и вашей семьи
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Навигация</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-accent transition-colors">Главная</a></li>
              <li><a href="#gallery" className="hover:text-accent transition-colors">Галерея</a></li>
              <li><a href="#amenities" className="hover:text-accent transition-colors">Удобства</a></li>
              <li><a href="#reviews" className="hover:text-accent transition-colors">Отзывы</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Контакты</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <i className="fas fa-phone"></i>
                <span>+998 (90) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope"></i>
                <span>info@dacharetreat.uz</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i>
                <span>Чорвонский район, село Заркайнар</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Подписка</h4>
            <p className="text-gray-400 mb-4">Подпишитесь на новости и спецпредложения</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-l-xl bg-gray-800 border-none outline-none text-white"
              />
              <button className="px-4 bg-accent hover:bg-emerald-700 rounded-r-xl">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        {user?.isAdmin && (
          <div className="mb-8 p-4 bg-yellow-900/20 rounded-xl border border-yellow-500/20">
            <button
              onClick={saveChanges}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors mb-2"
            >
              💾 Сохранить все изменения
            </button>
            <p className="text-xs text-yellow-400 text-center">
              Все изменения сохранятся в localStorage и будут видны всем пользователям
            </p>
          </div>
        )}

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Dacha Retreat. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-emerald-700 transition-colors duration-300"
        >
          <i className="fas fa-chevron-up"></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// =============== MAIN CONTENT ===============

const MainContent = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme || (prefersDark ? 'dark' : 'light');
    }
    return 'light';
  });
  
  const [lang, setLang] = useState('ru');
  const [currency, setCurrency] = useState('USD');
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Получаем контент из контекста
  const { content } = useContent();
  
  // Определяем t, используя контент и текущий язык
  const t = {
    nav: content.translations?.[lang]?.nav || {},
    hero: content.translations?.[lang]?.hero || {},
    booking: content.translations?.[lang]?.booking || {},
    gallery: content.translations?.[lang]?.gallery || {},
    amenities: content.translations?.[lang]?.amenities || {},
    reviews: content.translations?.[lang]?.reviews || {},
    footer: content.translations?.[lang]?.footer || {}
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['home', 'gallery', 'amenities', 'reviews', 'booking', 'contacts'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    const openAuthHandler = () => setIsAuthOpen(true);
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('openAuth', openAuthHandler);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('openAuth', openAuthHandler);
    };
  }, []);


  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen selection:bg-accent selection:text-white overflow-x-hidden">
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          className: 'rounded-xl shadow-lg !bg-white dark:!bg-gray-800 dark:!text-white',
          duration: 3000 
        }} 
      />
      
      <Header 
        lang={lang} 
        setLang={setLang}
        currency={currency} 
        setCurrency={setCurrency}
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        scrolled={scrolled}
        activeSection={activeSection}
      />

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1920&q=80" 
              className="w-full h-full object-cover"
              alt="Фон дачи"
            />
          </motion.div>

          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20 grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center relative z-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Доступно для бронирования
              </div>
              
              <EditableText 
                section="translations"
                path={`${lang}.hero.title`}
                value={t.hero.title}
                element="h1"
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
              />
              
              <EditableText 
                section="translations"
                path={`${lang}.hero.description`}
                value={t.hero.description}
                element="p"
                className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-xl"
              />
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#booking" 
                  className="px-8 py-4 bg-accent hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-green-900/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
                >
                  {t.hero.bookNow} <i className="fas fa-arrow-right"></i>
                </a>
                <a 
                  href="#gallery" 
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1"
                >
                  {t.hero.viewGallery}
                </a>
              </div>
            </motion.div>

            <BookingCard currency={currency} t={t} />
          </div>
        </section>

        <GallerySection />
        <AmenitiesSection />
        <ReviewsSection />

        {/* BOOKING SECTION */}
        <section id="booking" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <EditableText 
              section="translations"
              path={`${lang}.booking.title`}
              value={t.booking.title}
              element="h2"
              className="text-4xl md:text-5xl font-bold font-display mb-4 dark:text-white"
            />
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Забронируйте свой идеальный отдых прямо сейчас
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold dark:text-white">Почему выбирают нас?</h3>
              <ul className="space-y-4">
                {[
                  'Бесплатная отмена за 48 часов',
                  'Полностью оборудованный дом',
                  'Ежедневная уборка',
                  'Трансфер от аэропорта',
                  'Персональный консьерж',
                  'Детская площадка и няня'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <i className="fas fa-check-circle text-accent"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <BookingCard currency={currency} t={t} />
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer t={t} />
      <ScrollToTop />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

// =============== APP ENTRY POINT ===============

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider initialContent={initialContent}>
        <MainContent />
      </ContentProvider>
    </AuthProvider>
  );
}