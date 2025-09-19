import { NextResponse } from "next/server";
import quiz1 from "@/data/quizzes/quiz1";
import quiz2 from "@/data/quizzes/quiz2";
import quiz3 from "@/data/quizzes/quiz3";

// Hardcoded quiz data with questions
const quizzes = {
  quiz1: {
    id: "quiz1",
    title: "Basic Traffic Rules",
    description: "Alertness.",
    difficulty: "Beginner",
    questionCount: 23,
    estimatedTime: "5 minutes",
    icon: "🚦",
    questions: quiz1
  },
  quiz2: {
    id: "quiz2",
    title: "Road Signs & Signals", 
    description: "Motorway Driving Rules",
    difficulty: "Intermediate",
    questionCount: 20,
    estimatedTime: "10 minutes",
    icon: "🚧",
    questions: quiz2
  },
  quiz3: {
    id: "quiz3",
    title: "Advanced Driving Skills",
    description: "Advanced questions about driving techniques and safety procedures.",
    difficulty: "Advanced",
    questionCount: 4,
    estimatedTime: "8 minutes", 
    icon: "🚗",
    questions: quiz3
  }
};

// GET /api/quizzes/[quizId] - Get specific quiz with questions
export async function GET(request, { params }) {
  try {
    const { quizId } = params;
    
    const quiz = quizzes[quizId];
    
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ quiz });
  } catch (err) {
    console.error("Error fetching quiz:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
