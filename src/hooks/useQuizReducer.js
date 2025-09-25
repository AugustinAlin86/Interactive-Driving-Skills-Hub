import { useReducer } from "react";

const initialState = {currentQuestionIndex: 0,score: 0, answers: [],reviewMode: false,
    isFinished: false,};

function quizReducer(state, action) {
  switch (action.type) {
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case "FINISH_QUIZ":
      return {
        ...state,
        isFinished: true,
        reviewMode: true,
      };
    default:
      return state;
  }
}

export function useQuizReducer() {
  return useReducer(quizReducer, initialState);
}
