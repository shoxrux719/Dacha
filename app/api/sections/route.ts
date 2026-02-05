// app/api/sections/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  // Здесь подключение к базе данных или файлу
  // Пример для файла или встроенных данных:
  const sections = [
    // ... другие секции
    {
      id: 3,
      slug: 'gallery',
      title: 'Галерея нашего проекта',
      text: 'Посмотрите фотографии нашего проекта',
      images: [
        { src: '/uploaded/image1.jpg', alt: 'Описание 1', categoryKey: 'exterior' },
        { src: '/uploaded/image2.jpg', alt: 'Описание 2', categoryKey: 'interior' },
      ]
    }
  ]
  
  if (slug) {
    const section = sections.find(s => s.slug === slug)
    return NextResponse.json(section)
  }
  
  return NextResponse.json(sections)
}