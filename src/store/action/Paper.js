import * as actionTypes from "./actionTypes";

export const restorePreviousAttempt = (previousPaperDetails) => {
  return {
    type: actionTypes.RESTORE_PREVIOUS_ATTEMPT,
    payload: previousPaperDetails,
  };
};

export const setNewAttemptTime = () => {
  return {
    type: actionTypes.SET_NEW_ATTEMPT_TIME,
  };
};

export const fetchPaper = (paper) => {
  console.log(paper);
  return {
    type: actionTypes.FETCH_PAPER,
    payload: paper,
  };
};

export const fetchPreviousSubjectwiseAnswers = (ansques) => {
  // console.log(ansques);
  return {
    type: actionTypes.FETCH_PREVIOUS_ANSWERS,
    payload: ansques,
  };
};
export const setSeen = (ind) => {
  return {
    type: actionTypes.SET_SEEN,
    payload: {
      index: ind,
    },
  };
};
export const setAnswer = (ind, ans) => {
  return {
    type: actionTypes.SET_ANSWER,
    payload: {
      index: ind,
      answer: ans,
    },
  };
};
export const clearAnswer = (ind) => {
  return {
    type: actionTypes.CLEAR_ANSWER,
    payload: {
      index: ind,
    },
  };
};
export const bookmarkQuestion = (ind) => {
  return {
    type: actionTypes.BOOKMARK_QUESTION,
    payload: {
      index: ind,
    },
  };
};

export const attemptSubjective = (ind, ans) => {
  return {
    type: actionTypes.ATTEMPT_SUBJECTIVE,
    payload: {
      index: ind,
      answer: ans,
    },
  };
};
