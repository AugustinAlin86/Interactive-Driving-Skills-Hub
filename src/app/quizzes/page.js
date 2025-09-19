"use client";

import { useUserStatus } from "@/hooks/useUserStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function QuizzesPage() {
  const { user, loading } = useUserStatus();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load available quizzes from database
    const loadQuizzes = async () => {
      try {
        setLoadingQuizzes(true);
        const response = await fetch('/api/quizzes');
        const data = await response.json();
        
        if (response.ok) {
          setQuizzes(data.quizzes || []);
        } else {
          console.error("Error loading quizzes:", data.error);
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Error loading quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoadingQuizzes(false);
      }
    };

    if (user) {
      loadQuizzes();
    }
  }, [user]);

  if (loading || loadingQuizzes) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading quizzes...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Driving Knowledge Quizzes
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Test your driving knowledge with our comprehensive quiz collection. 
              Each quiz is designed to help you prepare for your driving test and improve your road safety awareness.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quizzes Available</h3>
            <p className="text-gray-600 mb-6">There are currently no active quizzes. Check back later!</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{quiz.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {quiz.questionCount} questions
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {quiz.estimatedTime}
                  </div>
                </div>
                
                <Link 
                  href={`/quizzes/${quiz.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quiz Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How it works</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Answer multiple choice questions</li>
                <li>• Get immediate feedback on each answer</li>
                <li>• Review explanations for better understanding</li>
                <li>• Track your progress and scores</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Scoring System</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 10 points per correct answer</li>
                <li>• No penalty for wrong answers</li>
                <li>• Results saved to your profile</li>
                <li>• Review your quiz history anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
