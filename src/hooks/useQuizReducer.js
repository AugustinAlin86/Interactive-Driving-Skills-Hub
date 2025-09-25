import { useReducer } from "react";

const POINTS_PER_CORRECT = 10;

export const initialState = {
  current: 0,
  selectedOption: null,
  isCorrect: null,
  showExplanation: false,
  finished: false,
  score: 0,
  answers: [],
  showReview: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "ANSWER":
      const newAnswer = {
        questionIndex: state.current,
        question: action.question,
        selectedOption: action.option,
        correctAnswer: action.correctAnswer,
        isCorrect: action.option === action.correctAnswer,
        options: action.options,
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

export function useQuizReducer() {
  return useReducer(quizCoreReducer, initialState);
}

export { POINTS_PER_CORRECT };
