import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    title: "Привет, дача!",
    text: "Это тестовый контент"
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  console.log('Сохраняем контент:', body)
  return NextResponse.json({ ok: true })
}
