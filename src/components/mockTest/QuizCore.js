"use client";
import { useReducer, useEffect, useState } from "react";
import AskOpenAi from "./AskOpenAi";
import { db, auth } from "@/lib/client/firebaseClient";
import { collection,getDoc,addDoc, doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import Link from "next/link";


const POINTS_PER_CORRECT = 10;

const initialState = {
  current: 0,
  selectedOption: null,
  isCorrect: null,
  showExplanation: false,
  finished: false,
  score: 0,
  answers: [],
  showReview: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "ANSWER":
      const newAnswer = {
        questionIndex: state.current,
        question: action.question,
        selectedOption: action.option,
        correctAnswer: action.correctAnswer,
        isCorrect: action.option === action.correctAnswer,
        options: action.options
      };
      
      return {
        ...state,
        selectedOption: action.option,
        isCorrect: action.option === action.correctAnswer,
        showExplanation: true,
        score: action.option === action.correctAnswer ? state.score + 1 : state.score,
        answers: [...state.answers, newAnswer],
      };
    case "NEXT":
      const nextIndex = state.current + 1;
      return nextIndex < action.total
        ? {
            ...state,
            current: nextIndex,
            selectedOption: null,
            isCorrect: null,
            showExplanation: false,
          }
        : { ...state, finished: true };
    case "REVIEW":
      return { ...state, showReview: true };
    case "RESTART":
      return {
        ...initialState,
        answers: [],
      };
    default:
      return state;
  }
}

export default function QuizCore({ questions, quizId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const question = questions[state.current];

  
  useEffect(() => {
    if (state.finished && !state.showReview) {
     const saveResult = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    const pointsEarned = state.score * POINTS_PER_CORRECT;

    await addDoc(collection(db, "quizResults"), {
      userId: user.uid,
      userEmail: user.email || null,
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      quizId: quizId,
      score: state.score,
      total: questions.length,
      pointsEarned,
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", user.uid), {
      points: increment(pointsEarned),
    });

    console.log("✅ Quiz results and points saved!");
  } catch (err) {
    console.error("❌ Error saving quiz result:", err);
  }
};
      saveResult();
    }
  }, [state.finished, state.showReview, state.score, quizId, questions.length]);

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No questions available.</p>
      </div>
    );
  }

  const percentage = Math.round((state.score / questions.length) * 100);
  const wrongAnswers = questions.length - state.score;

  if (state.showReview) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Quiz Review</h2>
            <p className="text-gray-600">Review your answers and explanations</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {state.answers.map((answer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      Question {answer.questionIndex + 1}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      answer.isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {answer.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{answer.question}</p>
                  
                  <div className="space-y-2">
                    {answer.options.map((option) => (
                      <div
                        key={option}
                        className={`p-3 rounded-lg border ${
                          option === answer.correctAnswer
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : option === answer.selectedOption && !answer.isCorrect
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">
                            {option === answer.correctAnswer ? '✅' : 
                             option === answer.selectedOption && !answer.isCorrect ? '❌' : '○'}
                          </span>
                          {option}
                          {option === answer.correctAnswer && (
                            <span className="ml-2 text-sm font-medium">(Correct Answer)</span>
                          )}
                          {option === answer.selectedOption && !answer.isCorrect && (
                            <span className="ml-2 text-sm font-medium">(Your Answer)</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => dispatch({ type: "RESTART" })}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Retake Quiz
              </button>
              <Link
                href="/quizzes"
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.finished) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600">Great job on completing the quiz!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{state.score}</div>
                <div className="text-sm text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{wrongAnswers}</div>
                <div className="text-sm text-red-700">Incorrect</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">{percentage}%</div>
              <div className="text-gray-600">Overall Score</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {state.score * POINTS_PER_CORRECT} Points Earned
              </div>
              <div className="text-sm text-gray-600">
                {state.score} correct answers × {POINTS_PER_CORRECT} points each
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => dispatch({ type: "REVIEW" })}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review Answers
              </button>
              <button
                onClick={() => dispatch({ type: "RESTART" })}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Retake Quiz
              </button>
              <Link
                href="/quizzes"
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Progress Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">Question {state.current + 1} of {questions.length}</h2>
            <div className="text-sm text-gray-600">
              {state.score} correct so far
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((state.current + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() =>
                  dispatch({ 
                    type: "ANSWER", 
                    option, 
                    correctAnswer: question.answer,
                    question: question.question,
                    options: question.options
                  })
                }
                disabled={state.selectedOption !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  state.selectedOption === option
                    ? state.isCorrect
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                } ${state.selectedOption !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </div>
              </button>
            ))}
          </div>

          {state.selectedOption && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                {state.isCorrect ? (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Incorrect. The correct answer is: {question.answer}</span>
                  </div>
                )}
              </div>

              {state.showExplanation && (
                <div className="mb-4">
                  <AskOpenAi
                    prompt={`Explain why the answer to this question is: "${question.answer}". Question: ${question.question}`}
                  />
                </div>
              )}

              <button
                onClick={() => dispatch({ type: "NEXT", total: questions.length })}
                className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {state.current + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
