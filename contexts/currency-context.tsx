"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Currency = "USD" | "RUB" | "UZS"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (priceInUSD: number) => string
  convertPrice: (priceInUSD: number) => number
}

// Exchange rates (these would come from an API in production)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  RUB: 92.5,
  UZS: 12750,
}

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  RUB: "₽",
  UZS: "сўм",
}

const currencyLocales: Record<Currency, string> = {
  USD: "en-US",
  RUB: "ru-RU",
  UZS: "uz-UZ",
}

const convertPriceHelper = (priceInUSD: number, currency: Currency): number => {
  return Math.round(priceInUSD * exchangeRates[currency])
}

const formatPriceHelper = (priceInUSD: number, currency: Currency): string => {
  const converted = convertPriceHelper(priceInUSD, currency)

  if (currency === "UZS") {
    return `${converted.toLocaleString("uz-UZ").replace(/,/g, " ")} ${currencySymbols[currency]}`
  }

  return new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(converted)
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (price) => formatPriceHelper(price, "USD"),
  convertPrice: (price) => convertPriceHelper(price, "USD"),
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD")

  useEffect(() => {
    const stored = localStorage.getItem("currency") as Currency | null
    if (stored && exchangeRates[stored]) {
      setCurrencyState(stored)
    }
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("currency", newCurrency)
  }

  const convertPrice = (priceInUSD: number): number => {
    return convertPriceHelper(priceInUSD, currency)
  }

  const formatPrice = (priceInUSD: number): string => {
    return formatPriceHelper(priceInUSD, currency)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  return context
}
