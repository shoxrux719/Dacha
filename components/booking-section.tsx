
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Calendar, Users, CalendarDays, Clock, CheckCircle, Sparkles, PartyPopper, Bot, X, Check, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useCurrency } from "@/contexts/currency-context"

const PRICE_PER_NIGHT_USD = 450

// Массив забавных фраз для таймера на разных языках
const FUNNY_MESSAGES = {
  en: [
    "Thinking about how to make your vacation perfect...",
    "Contacting the house spirit at the dacha...",
    "Checking if hedgehogs haven't occupied the dacha...",
    "Brewing raspberry tea for your arrival...",
    "Adjusting cozy armchairs...",
    "Checking barbecue supplies...",
    "Waking up the grills from sleep...",
    "Ordering good weather for you..."
  ],
  ru: [
    "Думаем, как сделать ваш отдых идеальным...",
    "Связываемся с домовым на даче...",
    "Проверяем, не заняли ли дачу ежики...",
    "Готовим малиновый чай для встречи...",
    "Настраиваем уютные кресла...",
    "Проверяем запасы шашлыка...",
    "Будим мангалы ото сна...",
    "Заказываем хорошую погоду..."
  ],
  uz: [
    "Tatilingizni mukammal qilish haqida o'ylayapmiz...",
    "Dachadagi uy ruhi bilan bog'lanmoqdamiz...",
    "Dachani kirpilar egallab olmaganligini tekshirmoqdamiz...",
    "Kelishingiz uchun malina choyini tayyorlayapmiz...",
    "Qulay kreslolarni sozlamoqdamiz...",
    "Barbekyu zapaslarini tekshirmoqdamiz...",
    "Mangallarni uyg'otmoqdamiz...",
    "Sizga yaxshi ob-havo buyurtma qilmoqdamiz..."
  ]
}

// Типы уведомлений
type ToastType = "success" | "error" | "warning" | "info"

// Интерфейс для уведомления
interface Toast {
  id: number
  message: string
  type: ToastType
  title?: string
  duration?: number
}

// Типы переводов для компонента
interface ComponentTranslations {
  examplePhone: string
  datesRequired: string
  datesRequiredTitle: string
  invalidDates: string
  invalidDatesTitle: string
  invalidPhone: string
  invalidPhoneTitle: string
  pastDate: string
  pastDateTitle: string
  confirmationInfo: string
  confirmationInfoTitle: string
  demoSuccess: string
  demoSuccessTitle: string
  realSuccess: string
  realSuccessTitle: string
  error: string
  errorTitle: string
  dateReset: string
  dateResetTitle: string
  confirmationTitle: string
  confirmationDescription: string
  confirmationTime: string
  cancelRequest: string
  sendRequest: string
  sending: string
  demoModeAlert: string
  timerFinished: string
  selectDates: string
  selectDatesHint: string
  testMode: string
  demoMode: string
  demoModeFull: string
}

export function BookingSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t, language } = useLanguage()
  const { formatPrice } = useCurrency()

  // State
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const [phone, setPhone] = useState("+998 ")
  const [isSending, setIsSending] = useState(false)
  
  // Новые состояния для модального окна подтверждения
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [isCountdownActive, setIsCountdownActive] = useState(false)
  const [funnyMessageIndex, setFunnyMessageIndex] = useState(0)
  
  // Состояния для красивых уведомлений
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastIdCounter = useRef(0)

  /* =========================
     Функции для уведомлений
  ========================= */
  const showToast = (message: string, type: ToastType = "info", title?: string, duration: number = 5000) => {
    const id = ++toastIdCounter.current
    const newToast: Toast = { id, message, type, title, duration }
    
    setToasts(prev => [...prev, newToast])
    
    // Автоматическое удаление через указанное время
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (message: string, title?: string) => {
    showToast(message, "success", title || (language === "en" ? "Success!" : language === "ru" ? "Успешно!" : "Muvaffaqiyat!"), 4000)
  }

  const showError = (message: string, title?: string) => {
    showToast(message, "error", title || (language === "en" ? "Error" : language === "ru" ? "Ошибка" : "Xato"), 6000)
  }

  const showWarning = (message: string, title?: string) => {
    showToast(message, "warning", title || (language === "en" ? "Attention" : language === "ru" ? "Внимание" : "Diqqat"), 5000)
  }

  const showInfo = (message: string, title?: string) => {
    showToast(message, "info", title || (language === "en" ? "Information" : language === "ru" ? "Информация" : "Ma'lumot"), 4000)
  }

  /* =========================
     Локализованные сообщения
  ========================= */
  const getComponentTranslations = (): ComponentTranslations => {
    if (language === "en") {
      return {
        examplePhone: "Example: +998 (90) 123-45-67",
        datesRequired: "Please select check-in and check-out dates",
        datesRequiredTitle: "📅 Dates not filled",
        invalidDates: "Check-out date must be after check-in date",
        invalidDatesTitle: "❌ Invalid dates",
        invalidPhone: "Please enter a valid Uzbekistan phone number in format +998",
        invalidPhoneTitle: "📱 Invalid number",
        pastDate: "Check-in date cannot be in the past",
        pastDateTitle: "⚠️ Check the date",
        confirmationInfo: "Please confirm your request in the window that appears",
        confirmationInfoTitle: "📝 Confirmation",
        demoSuccess: "The dacha owner (in real mode) will contact you within a day!\n\nRequest data saved for demonstration.",
        demoSuccessTitle: "🎉 Request saved in demo mode!",
        realSuccess: "The dacha owner will contact you within a day. Wait for a call to the phone number provided.",
        realSuccessTitle: "✅ Request successfully sent!",
        error: "Error sending: {error}\n\nYou can:\n1. Check internet connection\n2. Try again in a minute\n3. Contact us by phone",
        errorTitle: "❌ Sending error",
        dateReset: "Check-in date was in the past, field reset",
        dateResetTitle: "🔄 Date update",
        confirmationTitle: "Request Confirmation",
        confirmationDescription: "After submitting the request, the dacha owner will contact you within a day",
        confirmationTime: "Confirmation in:",
        cancelRequest: "Cancel request",
        sendRequest: "Send request",
        sending: "Sending...",
        demoModeAlert: "⚠️ Demo mode: request will be saved locally",
        timerFinished: "Now you can send the request!",
        selectDates: "Select dates",
        selectDatesHint: "Choose dates",
        testMode: "⚠️ Test mode",
        demoMode: "Demo mode",
        demoModeFull: "Demo mode: request will be saved locally. For real sending, set up Telegram bot."
      }
    } else if (language === "ru") {
      return {
        examplePhone: "Пример: +998 (90) 123-45-67",
        datesRequired: "Пожалуйста, выберите даты заезда и выезда",
        datesRequiredTitle: "📅 Не заполнены даты",
        invalidDates: "Дата выезда должна быть позже даты заезда",
        invalidDatesTitle: "❌ Некорректные даты",
        invalidPhone: "Введите корректный номер телефона Узбекистана в формате +998",
        invalidPhoneTitle: "📱 Неверный номер",
        pastDate: "Дата заезда не может быть в прошлом",
        pastDateTitle: "⚠️ Проверьте дату",
        confirmationInfo: "Пожалуйста, подтвердите заявку в появившемся окне",
        confirmationInfoTitle: "📝 Подтверждение",
        demoSuccess: "Владелец дачи (в реальном режиме) свяжется с вами в течение дня!\n\nДанные заявки сохранены для демонстрации.",
        demoSuccessTitle: "🎉 Заявка сохранена в демо-режиме!",
        realSuccess: "Владелец дачи свяжется с вами в течение дня. Ожидайте звонка на указанный номер телефона.",
        realSuccessTitle: "✅ Заявка успешно отправлена!",
        error: "Ошибка отправки: {error}\n\nВы можете:\n1. Проверить интернет-соединение\n2. Попробовать снова через минуту\n3. Связаться с нами по телефону",
        errorTitle: "❌ Ошибка отправки",
        dateReset: "Дата заезда была в прошлом, поле сброшено",
        dateResetTitle: "🔄 Обновление дат",
        confirmationTitle: "Подтверждение заявки",
        confirmationDescription: "После отправки заявки владелец дачи свяжется с вами в течение дня",
        confirmationTime: "Подтверждение через:",
        cancelRequest: "Отменить заявку",
        sendRequest: "Отправить заявку",
        sending: "Отправка...",
        demoModeAlert: "⚠️ Демо-режим: заявка сохранится локально",
        timerFinished: "Теперь можно отправить заявку!",
        selectDates: "Выберите даты",
        selectDatesHint: "Выберите даты",
        testMode: "⚠️ Тестовый режим",
        demoMode: "Демо-режим",
        demoModeFull: "Демо-режим: заявка сохранится локально. Для реальной отправки настройте Telegram бота."
      }
    } else { // uz
      return {
        examplePhone: "Namuna: +998 (90) 123-45-67",
        datesRequired: "Iltimos, kirish va chiqish sanalarini tanlang",
        datesRequiredTitle: "📅 Sanalar to'ldirilmagan",
        invalidDates: "Chiqish sanasi kirish sanasidan keyin bo'lishi kerak",
        invalidDatesTitle: "❌ Noto'g'ri sanalar",
        invalidPhone: "Iltimos, O'zbekistonning to'g'ri telefon raqamini +998 formatida kiriting",
        invalidPhoneTitle: "📱 Noto'g'ri raqam",
        pastDate: "Kirish sanasi o'tmishda bo'lishi mumkin emas",
        pastDateTitle: "⚠️ Sanani tekshiring",
        confirmationInfo: "Iltimos, so'rovingizni paydo bo'lgan oynada tasdiqlang",
        confirmationInfoTitle: "📝 Tasdiqlash",
        demoSuccess: "Dacha egasi (haqiqiy rejimda) siz bilan bir kun ichida bog'lanadi!\n\nSo'rov ma'lumotlari namoyish uchun saqlandi.",
        demoSuccessTitle: "🎉 So'rov demo rejimida saqlandi!",
        realSuccess: "Dacha egasi siz bilan bir kun ichida bog'lanadi. Ko'rsatilgan telefon raqamiga qo'ng'iroqni kuting.",
        realSuccessTitle: "✅ So'rov muvaffaqiyatli yuborildi!",
        error: "Yuborish xatosi: {error}\n\nSiz quyidagilarni qilishingiz mumkin:\n1. Internet ulanishini tekshiring\n2. Bir daqiqadan keyin qayta urinib ko'ring\n3. Telefon orqali biz bilan bog'laning",
        errorTitle: "❌ Yuborish xatosi",
        dateReset: "Kirish sanasi o'tmishda edi, maydon qayta tiklandi",
        dateResetTitle: "🔄 Sanani yangilash",
        confirmationTitle: "So'rovni Tasdiqlash",
        confirmationDescription: "So'rov yuborilgandan so'ng, dacha egasi siz bilan bir kun ichida bog'lanadi",
        confirmationTime: "Tasdiqlash:",
        cancelRequest: "So'rovni bekor qilish",
        sendRequest: "So'rovni yuborish",
        sending: "Yuborilmoqda...",
        demoModeAlert: "⚠️ Demo rejim: so'rov mahalliy saqlanadi",
        timerFinished: "Endi so'rovni yuborishingiz mumkin!",
        selectDates: "Sanani tanlang",
        selectDatesHint: "Sanani tanlang",
        testMode: "⚠️ Test rejimi",
        demoMode: "Demo rejim",
        demoModeFull: "Demo rejim: so'rov mahalliy saqlanadi. Haqiqiy yuborish uchun Telegram botini sozlang."
      }
    }
  }

  const trans = getComponentTranslations()

  /* =========================
     localStorage load
  ========================= */
  useEffect(() => {
    const savedCheckIn = localStorage.getItem("booking-check-in")
    const savedCheckOut = localStorage.getItem("booking-check-out")
    const savedGuests = localStorage.getItem("booking-guests")
    const savedPhone = localStorage.getItem("booking-phone")

    if (savedCheckIn) setCheckIn(savedCheckIn)
    if (savedCheckOut) setCheckOut(savedCheckOut)
    if (savedGuests) setGuests(savedGuests)
    if (savedPhone) setPhone(savedPhone)
  }, [])

  /* =========================
     Таймер подтверждения
  ========================= */
  useEffect(() => {
    let interval: NodeJS.Timeout
    let messageInterval: NodeJS.Timeout

    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountdownActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Меняем забавные сообщения каждые 1.5 секунды
      messageInterval = setInterval(() => {
        setFunnyMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES[language].length)
      }, 1500)
    }

    return () => {
      if (interval) clearInterval(interval)
      if (messageInterval) clearInterval(messageInterval)
    }
  }, [isCountdownActive, countdown, language])

  /* =========================
     Запуск таймера при открытии модалки
  ========================= */
  const startConfirmation = () => {
    setCountdown(10)
    setFunnyMessageIndex(0)
    setIsCountdownActive(true)
    setShowConfirmation(true)
  }

  /* =========================
     Сброс таймера
  ========================= */
  const resetConfirmation = () => {
    setIsCountdownActive(false)
    setCountdown(10)
    setShowConfirmation(false)
  }

  /* =========================
     localStorage save
  ========================= */
  const saveLS = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCheckIn(value)
    saveLS("booking-check-in", value)
  }

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCheckOut(value)
    saveLS("booking-check-out", value)
  }

  const handleGuestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setGuests(value)
    saveLS("booking-guests", value)
  }

  /* =========================
     nights + price
  ========================= */
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const nights = calculateNights()
  const totalPrice = nights * PRICE_PER_NIGHT_USD

  /* =========================
     Phone formatter (+998)
  ========================= */
  const formatUzPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    let local = digits
    if (local.startsWith("998")) local = local.slice(3)
    local = local.slice(0, 9)

    const parts = {
      code2: local.slice(0, 2),
      part1: local.slice(2, 5),
      part2: local.slice(5, 7),
      part3: local.slice(7, 9),
    }

    let result = "+998 "
    if (parts.code2.length > 0) {
      result += `(${parts.code2}`
      if (parts.code2.length === 2) result += ") "
    }
    if (parts.part1) result += parts.part1
    if (parts.part2) result += `-${parts.part2}`
    if (parts.part3) result += `-${parts.part3}`

    return result
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzPhone(e.target.value)
    setPhone(formatted)
    saveLS("booking-phone", formatted)
  }

  /* =========================
     Telegram - С ИСПРАВЛЕНИЯМИ ДЛЯ DEMO РЕЖИМА
  ========================= */
  const sendToTelegram = async () => {
    // Проверяем, установлены ли переменные окружения
    const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

    // Если переменные не установлены, используем демо-режим
    if (!BOT_TOKEN || !CHAT_ID || BOT_TOKEN === "YOUR_BOT_TOKEN" || CHAT_ID === "YOUR_CHAT_ID") {
      console.warn("⚠️ Переменные окружения для Telegram не установлены. Включен демо-режим.")
      
      // Демо-режим: имитируем успешную отправку через задержку
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Сохраняем демо-данные в localStorage для отладки
      const demoData = {
        checkIn,
        checkOut,
        guests,
        phone,
        nights,
        total: formatPrice(totalPrice),
        timestamp: new Date().toISOString()
      }
      localStorage.setItem("last-booking-demo", JSON.stringify(demoData))
      
      // В демо-режиме всегда успешно
      return { ok: true, demo: true }
    }

    const message = language === "en" 
      ? `
📩 *New Booking Request*

📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut}
👥 Guests: ${guests}
📞 Phone: ${phone}
🌙 Nights: ${nights}
💰 Amount: ${formatPrice(totalPrice)}
🕐 Request date: ${new Date().toLocaleString()}
    `
      : language === "ru"
      ? `
📩 *Новая заявка на бронирование*

📅 Заезд: ${checkIn}
📅 Выезд: ${checkOut}
👥 Гостей: ${guests}
📞 Телефон: ${phone}
🌙 Ночей: ${nights}
💰 Сумма: ${formatPrice(totalPrice)}
🕐 Дата заявки: ${new Date().toLocaleString()}
    `
      : `
📩 *Yangi bron so'rovi*

📅 Kirish: ${checkIn}
📅 Chiqish: ${checkOut}
👥 Mehmonlar: ${guests}
📞 Telefon: ${phone}
🌙 Kechalar: ${nights}
💰 Miqdor: ${formatPrice(totalPrice)}
🕐 So'rov sanasi: ${new Date().toLocaleString()}
    `

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        console.error("Ошибка Telegram API:", data)
        throw new Error(data?.description ?? `Ошибка Telegram API: ${res.status}`)
      }
      
      return data
    } catch (error) {
      console.error("Сетевая ошибка при отправке в Telegram:", error)
      throw error
    }
  }

  /* =========================
     Submit с подтверждением
  ========================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!checkIn || !checkOut) {
      showWarning(trans.datesRequired, trans.datesRequiredTitle)
      return
    }

    if (nights === 0) {
      showError(trans.invalidDates, trans.invalidDatesTitle)
      return
    }

    const digits = phone.replace(/\D/g, "")
    if (digits.length !== 12 || !digits.startsWith("998")) {
      showError(trans.invalidPhone, trans.invalidPhoneTitle)
      return
    }

    // Проверяем, что дата заезда не в прошлом
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkInDate = new Date(checkIn)
    if (checkInDate < today) {
      showWarning(trans.pastDate, trans.pastDateTitle)
      return
    }

    // Вместо отправки сразу показываем окно подтверждения
    startConfirmation()
    
    // Показываем информационное уведомление
    showInfo(trans.confirmationInfo, trans.confirmationInfoTitle)
  }

  /* =========================
     Финальная отправка (после таймера) - С УЛУЧШЕННОЙ ОБРАБОТКОЙ ОШИБОК
  ========================= */
  const handleFinalSubmit = async () => {
    setIsSending(true)
    
    try {
      const result = await sendToTelegram()
      
      // Проверяем, в демо-режиме ли мы
      if (result.demo) {
        // Демо-режим - показываем специальное сообщение
        showSuccess(trans.demoSuccess, trans.demoSuccessTitle)
      } else {
        // Реальный режим - обычное сообщение
        showSuccess(trans.realSuccess, trans.realSuccessTitle)
      }
      
      setShowConfirmation(false)
      
      // Очистка формы после успешной отправки
      setTimeout(() => {
        setCheckIn("")
        setCheckOut("")
        setGuests("2")
        setPhone("+998 ")
        localStorage.removeItem("booking-check-in")
        localStorage.removeItem("booking-check-out")
        localStorage.removeItem("booking-guests")
        localStorage.removeItem("booking-phone")
      }, 1000)
      
    } catch (err) {
      console.error("Ошибка при отправке заявки:", err)
      
      // Более информативное сообщение об ошибке
      const errorMessage = err instanceof Error 
        ? trans.error.replace("{error}", err.message)
        : trans.error.replace("{error}", language === "en" ? "Unknown error" : language === "ru" ? "Неизвестная ошибка" : "Noma'lum xato")
      
      showError(errorMessage, trans.errorTitle)
      
    } finally {
      setIsSending(false)
      setIsCountdownActive(false)
    }
  }

  /* =========================
     Проверка дат при загрузке
  ========================= */
  useEffect(() => {
    if (checkIn && checkOut) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const checkInDate = new Date(checkIn)
      
      if (checkInDate < today) {
        // Если дата в прошлом, сбрасываем
        setCheckIn("")
        localStorage.removeItem("booking-check-in")
        showWarning(trans.dateReset, trans.dateResetTitle)
      }
    }
  }, [checkIn, checkOut])

  /* =========================
     Компонент для красивых уведомлений
  ========================= */
  const ToastItem = ({ toast }: { toast: Toast }) => {
    const getIcon = () => {
      switch (toast.type) {
        case "success": return <Check className="w-5 h-5" />
        case "error": return <X className="w-5 h-5" />
        case "warning": return <AlertCircle className="w-5 h-5" />
        case "info": return <Info className="w-5 h-5" />
        default: return <Info className="w-5 h-5" />
      }
    }

    const getBgColor = () => {
      switch (toast.type) {
        case "success": return "bg-gradient-to-r from-green-500 to-emerald-600"
        case "error": return "bg-gradient-to-r from-red-500 to-rose-600"
        case "warning": return "bg-gradient-to-r from-amber-500 to-yellow-600"
        case "info": return "bg-gradient-to-r from-blue-500 to-cyan-600"
        default: return "bg-gradient-to-r from-gray-600 to-gray-700"
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.9 }}
        className={`${getBgColor()} text-white rounded-xl shadow-2xl p-4 mb-3 w-full max-w-sm relative overflow-hidden border border-white/20`}
      >
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
        
        <div className="relative z-10 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              {getIcon()}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className="font-bold text-lg mb-1">{toast.title}</h4>
            )}
            <p className="text-sm whitespace-pre-line leading-relaxed">{toast.message}</p>
          </div>
          
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label={language === "en" ? "Close notification" : language === "ru" ? "Закрыть уведомление" : "Bildirishnmani yopish"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Прогресс-бар для таймера */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
          onAnimationComplete={() => removeToast(toast.id)}
        />
      </motion.div>
    )
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Индикатор демо-режима */}
      {(!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 
        process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN") && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm shadow-lg z-40"
        >
          <Bot className="w-4 h-4" />
          <span>{trans.demoMode}</span>
        </motion.div>
      )}

      {/* Контейнер для уведомлений */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-2 max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto" />
          </motion.div>
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            {t("booking.subtitle")}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light">
            {t("booking.title1")} <span className="italic">{t("booking.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 md:p-10 border border-border rounded-2xl shadow-xl relative"
          >
            {/* Подсказка о демо-режиме */}
            {(!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 
              process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN") && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-1 rounded-full text-xs font-medium animate-pulse shadow-md">
                {trans.testMode}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="check-in" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    {t("booking.checkIn")}
                  </Label>
                  <Input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    onChange={handleCheckInChange}
                    className="bg-background rounded-lg"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="check-out" className="flex items-center gap-2 text-sm font-medium">
                    <CalendarDays className="w-4 h-4" />
                    {t("booking.checkOut")}
                  </Label>
                  <Input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    onChange={handleCheckOutChange}
                    className="bg-background rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2 text-sm font-medium">
                  <Users className="w-4 h-4" />
                  {t("booking.guests")}
                </Label>
                <select
                  id="guests"
                  value={guests}
                  onChange={handleGuestsChange}
                  className="w-full h-10 px-3 bg-background border border-input text-foreground rounded-lg"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const value = i + 4 // 4 → 15
                    return (
                      <option key={value} value={value}>
                        {value} {value === 1 ? t("booking.guest") : t("booking.guestsPlural")}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  {t("booking.phone")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 (__) ___-__-__"
                  required
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {trans.examplePhone}
                </p>
              </div>

              {/* PRICE */}
              <div className="pt-6 border-t border-border space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>
                    {formatPrice(PRICE_PER_NIGHT_USD)} × {nights}{" "}
                    {nights !== 1 ? t("booking.nights") : t("booking.night")}
                  </span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                {nights >= 3 && (
                  <div className="flex justify-between text-green-600 text-sm">
                    <span>🎉 {language === "en" ? "Long stay discount" : language === "ru" ? "Скидка за длительное проживание" : "Uzoq qolish uchun chegirma"}</span>
                    <span>-{formatPrice(nights * 20)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t("booking.total")}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-full relative overflow-hidden group"
                disabled={nights === 0}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("booking.requestBooking")}
                  <PartyPopper className="w-5 h-5" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                {nights === 0 && (
                  <span className="absolute inset-0 bg-muted/50 flex items-center justify-center text-sm">
                    {}
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 border border-border rounded-2xl shadow-lg">
              <h3 className="text-2xl font-serif font-light mb-6">{t("booking.pricing")}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">{t("booking.perNight")}</span>
                  <span className="text-2xl font-semibold">
                    {formatPrice(PRICE_PER_NIGHT_USD)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("booking.minimumStay")}</span>
                  <span>2 {t("booking.nights")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("booking.maximumGuests")}</span>
                  <span>10 {t("booking.guestsPlural")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("booking.costTosaturday")}</span>
                  <span>{formatPrice(100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("booking.costTosunday")}</span>
                  <span>{formatPrice(150)}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-8 border border-primary/20 rounded-2xl shadow-lg">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                {t("booking.instantConfirmation")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("booking.confirmationText")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно подтверждения */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => !isCountdownActive && resetConfirmation()}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: 10 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, rotateX: 10 }}
              className="bg-gradient-to-br from-card via-card to-card/90 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Декоративные элементы в модалке */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block p-3 bg-primary/10 rounded-full mb-4"
                  >
                    <Clock className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-light mb-2">
                    {trans.confirmationTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {trans.confirmationDescription}
                  </p>
                </div>

                {/* Анимированный прогресс-бар */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {trans.confirmationTime}
                    </span>
                    <motion.span 
                      key={countdown}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                    >
                      {countdown}{language === "en" ? "s" : language === "ru" ? "с" : "s"}
                    </motion.span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary shadow-lg"
                      initial={{ width: "100%" }}
                      animate={{ width: `${(countdown / 10) * 100}%` }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </div>
                </div>

                {/* Забавное сообщение */}
                <div className="mb-8 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <motion.p
                    key={funnyMessageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center italic text-muted-foreground"
                  >
                    {FUNNY_MESSAGES[language][funnyMessageIndex]}
                  </motion.p>
                </div>

                {/* Кнопки */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                    onClick={resetConfirmation}
                    disabled={isSending}
                  >
                    {trans.cancelRequest}
                  </Button>
                  <Button
                    className="flex-1 relative overflow-hidden group bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary shadow-lg"
                    onClick={handleFinalSubmit}
                    disabled={countdown > 0 || isSending}
                  >
                    <span className="relative z-10">
                      {isSending ? trans.sending : trans.sendRequest}
                    </span>
                    {countdown > 0 && (
                      <motion.div
                        className="absolute inset-0 bg-muted/50"
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: countdown, ease: "linear" }}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Button>
                </div>

                {/* Индикатор демо-режима в модалке */}
                {(!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || 
                  process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN === "YOUR_BOT_TOKEN") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-xl"
                  >
                    <p className="text-yellow-600 text-center text-sm">
                      {trans.demoModeAlert}
                    </p>
                  </motion.div>
                )}

                {/* Анимация при завершении таймера */}
                {countdown === 0 && !isSending && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
                  >
                    <p className="text-green-600 text-center text-sm font-medium flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      {trans.timerFinished}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}