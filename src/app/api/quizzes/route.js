import { NextResponse } from "next/server";


const quizzes = [
  {
    id: "quiz1",
    title: "Basic Traffic Rules",
    description: "Test your knowledge of fundamental traffic rules and regulations.",
    difficulty: "Beginner",
    questionCount: 2,
    estimatedTime: "5 minutes",
    icon: "🚦"
  },
  {
    id: "quiz2", 
    title: "Road Signs & Signals",
    description: "Learn about different road signs, signals, and their meanings.",
    difficulty: "Intermediate",
    questionCount: 5,
    estimatedTime: "10 minutes",
    icon: "🚧"
  },
  {
    id: "quiz3",
    title: "Advanced Driving Skills",
    description: "Advanced questions about driving techniques and safety procedures.",
    difficulty: "Advanced", 
    questionCount: 4,
    estimatedTime: "8 minutes",
    icon: "🚗"
  }
];

// GET /api/quizzes - Get all hardcoded quizzes
export async function GET(request) {
  try {
    return NextResponse.json({ quizzes });
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
