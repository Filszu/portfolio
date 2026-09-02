import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const url = process.env.EMAIL_SEND_URL
  const apiKey = process.env.EMAIL_SEND_API_KEY

  if (!url || !apiKey) {
    return NextResponse.json({ error: "Contact service is not configured" }, { status: 500 })
  }

  try {
    const { name, email, title, content } = await request.json()
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        title,
        content,
        apiKey,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Contact service rejected the request" }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Unable to send contact request" }, { status: 500 })
  }
}