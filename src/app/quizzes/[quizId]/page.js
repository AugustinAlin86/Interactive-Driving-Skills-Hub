'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserStatus } from '@/hooks/useUserStatus';
import QuizCore from '@/components/mockTest/QuizCore';
import Link from 'next/link';

export default function QuizDynamicPage() {
  const { quizId } = useParams();
  const { user, loading } = useUserStatus();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      setMessage('⚠️ Please log in to access quizzes. Redirecting…');
      const timer = setTimeout(() => router.replace('/login'), 2000);
      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  // Fetch quiz data from database
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!user) return;
      
      try {
        setLoadingQuiz(true);
        setError(null);
        
        const response = await fetch(`/api/quizzes/${quizId}`);
        const data = await response.json();
        
        if (response.ok) {
          setQuiz(data.quiz);
        } else {
          setError(data.error || 'Failed to load quiz');
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz');
      } finally {
        setLoadingQuiz(false);
      }
    };

    if (user && quizId) {
      fetchQuiz();
    }
  }, [user, quizId]);

  if (loading || loadingQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">{loading ? 'Checking login status...' : 'Loading quiz...'}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">{message || 'You must be signed in to access quizzes.'}</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error ? 'Error Loading Quiz' : 'Quiz Not Found'}
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The quiz you're looking for doesn't exist."}
          </p>
          <Link 
            href="/quizzes"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
            <Link 
              href="/quizzes"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuizCore questions={quiz.questions} quizId={quizId} />
      </div>
    </div>
  );
}
