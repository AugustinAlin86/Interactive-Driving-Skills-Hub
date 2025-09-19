import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { question } = await req.json();
    console.log("📩 Received question:", question);

    const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",     // ✅ lightweight + cheap

      messages: [{ role: 'user', content: question }],
    });

    const answer = completion.choices[0].message.content;
    console.log("✅ AI answer:", answer);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("❌ ERROR:", error.response?.data || error.message || error);
    return NextResponse.json({ answer: 'Failed to get answer from OpenAI' }, { status: 500 });
  }
}
