// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Создаем уникальное имя файла
    const timestamp = Date.now()
    const originalName = file.name.replace(/\.[^/.]+$/, "")
    const extension = file.name.split('.').pop()
    const filename = `${originalName}-${timestamp}.${extension}`
    
    // Сохраняем файл в public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const filepath = path.join(uploadDir, filename)
    
    await writeFile(filepath, buffer)
    
    // Возвращаем путь к файлу
    const imageUrl = `/uploads/${filename}`
    
    return NextResponse.json({ 
      success: true, 
      url: imageUrl 
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' }, 
      { status: 500 }
    )
  }
}