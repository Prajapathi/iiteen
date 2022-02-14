import * as actionTypes from "../action/actionTypes";

// Contents:
//     1. Initial values
//     2. Restore Previous Attempt of user
//     3. Fetching Paper
//     4. Fetching previous answers
//     5. Setting seen to true
//     6. Setting and evaluating answers
//     7. Clear Answer
//     8. Bookmark Questions
//     9. Attempt question for subjective question

//initial values
const initValues = {
  paper: {},
  answers: [],
  previousAttemptExists: false, //if this is true then we will not create new answers[] in fetchPaper()
  time: null,
  storeAnswers: false, //true for Mock tests and Previous year papers
  uid: null,
};

//If user wants to continue with a previous unfinished attempt then store this in the state and set previousAttemptExists to true
const restorePreviousAttempt = (state, action) => {
  if (action.payload.answers == false)
    return {
      ...state,
      previousAttemptExists: false,
      storeAnswers: true,
      uid: action.payload.uid,
    };
  else
    return {
      ...state,
      answers: action.payload.answers.answers,
      previousAttemptExists: true,
      time: action.payload.answers.time,
      storeAnswers: true,
      uid: action.payload.uid,
    };
};

//if this is a fresh attempt then set the time in state
const setNewAttemptTime = (state, action) => {
  return {
    ...state,
    time: new Date(),
  };
};

//store paper inside intital values and create answers[]
const fetchPaper = (state, action) => {
  // console.log("ha aya hai");
  console.log(action);
  console.log(state);
  //in case questions are not present
  if (action.payload.questions.length == 0)
    return {
      ...state,
      paper: action.payload,
    };

  let ans = [];

  //if there is no previous unfinished attempt to continue with, create a new answers array
  if (state.previousAttemptExists == false) {
    //after fetching paper, set the answers[]
    console.log(action.payload.noOfQuestions)
    for (let i = 0; i < action.payload.noOfQuestions; i++) {
      ans.push({
        qid:action.payload.questions[i] && action.payload.questions[i].qid?action.payload.questions[i].qid:"",
        uid: action.payload.questions[i] && action.payload.questions[i].uid?action.payload.questions[i].uid:"",
        number: i,
        answer: action.payload.questions[i] ? action.payload.questions[i].answer:null,
        answerGiven: action.payload.questions[i] && action.payload.questions[i].answerType == 5 ? [] : null,
        answerType: action.payload.questions[i] ? action.payload.questions[i].answerType:null,
        marks: action.payload.questions[i] && action.payload.questions[i].marks?action.payload.questions[i].marks:null,
        isSeen: false,
        isBookmarked: false,
        isAnsweredWrong: false,
        isAnswered: false,
      });
    }
  }
  console.log(ans);

  return {
    ...state,
    paper: action.payload,
    answers:
      state.previousAttemptExists == true
        ? state.answers
        : ans.length == 0
        ? state.answers
        : ans,
  };
};

const fetchPreviousSubjectwiseAnswers = (state, action) => {
  // new code
  let answer=action.payload.answers["Level 0" + action.payload.level]
  let ques=action.payload.questions
  // console.log(answer,ques,action.payload.level);
  let ans=[];
  for (let i = 0; i < 25; i++) {
    // ques[i] && console.log(answer.filter((t)=>(t.qid==ques[i].qid)))
    if(ques[i] && ques[i].qid  && answer.filter((t)=>(t.qid==ques[i].qid))!=undefined && answer.filter((t)=>(t.qid==ques[i].qid)).length!=0 && answer.filter((t)=>(t.qid==ques[i].qid))!=null){
      // console.log("included",answer.filter((t)=>(t.qid==ques[i].qid)))
      answer.filter((t)=>(t.qid==ques[i].qid))[0].number=i;
      ans.push(answer.filter((t)=>(t.qid==ques[i].qid))[0])
    }else{
      // ques[i] && console.log("not included",answer.filter((t)=>(t.qid==ques[i].qid)))
      ans.push({
        qid:ques[i] && ques[i].qid?ques[i].qid:"",
        uid: ques[i] && ques[i].uid?ques[i].uid:"",
        number: i,
        answer: ques[i] ? ques[i].answer:null,
        answerGiven: ques[i] && ques[i].answerType == 5 ? [] : null,
        answerType: ques[i] ? ques[i].answerType:null,
        marks: ques[i] && ques[i].marks?ques[i].marks:null,
        isSeen: false,
        isBookmarked: false,
        isAnsweredWrong: false,
        isAnswered: false
      });
    }
  }
  console.log(ans)
  
  return {
    ...state,
    answers: ans
  };
};

//setting seen as the question renders to show in question pallete
const setSeen = (state, action) => {
  if (action.payload.index < 0) return state;
  const ans = [...state.answers];
  ans[action.payload.index].isSeen = true;

  //if paper is a MOCKTEST or PREVIOUS YEAR, store it in local storage
  // if(state.storeAnswers==true) {
  //     let paperToStore={
  //         time:state.time,
  //         answers:ans
  //     }
  //     let papersFromLocalStorage={...JSON.parse(localStorage.getItem(state.uid))}
  //     papersFromLocalStorage[state.paper.name]=paperToStore
  //     localStorage.setItem(state.uid, JSON.stringify(papersFromLocalStorage))
  //     console.log("local one",state.uid,papersFromLocalStorage)
  // }

  return {
    ...state,
    answers: ans,
  };
};

//setting answerGiven and isAnswered fields and evaluating isAnsweredWrong
const setAnswer = (state, action) => {
  const ans = [...state.answers];
  // console.log(ans);
  // console.log(action.payload.index)
  // console.log(state, action);
  const data=ans.filter((a)=>(a.qid==action.payload.index))[0];
  data.answerGiven = action.payload.answer;
  data.isAnswered = true;


  //   switch (ans[action.payload.index].answerType) {
  //     case 1: {
  //       if (ans[action.payload.index].answer === action.payload.answer)
  //         ans[action.payload.index].isAnsweredWrong = false;
  //       else ans[action.payload.index].isAnsweredWrong = true;
  //       break;
  //     }
  //     case 2: {
  //       if (
  //         ans[action.payload.index].answer[0] <= action.payload.answer &&
  //         ans[action.payload.index].answer[1] >= action.payload.answer
  //       ) {
  //         ans[action.payload.index].isAnsweredWrong = false;
  //       } else ans[action.payload.index].isAnsweredWrong = true;
  //       break;
  //     }
  //     case 4: {
  //       console.log(ans[action.payload.index].answer, action.payload.answer);
  //       if (ans[action.payload.index].answer === action.payload.answer) {
  //         console.log("kyu");
  //         ans[action.payload.index].isAnsweredWrong = false;
  //       } else {
  //         console.log("yo");
  //         ans[action.payload.index].isAnsweredWrong = true;
  //       }

  //       break;
  //     }
  //     case 5: {
  //       let flag = 0;
  //       for (let i = 0; i < 4; i++) {
  //         if (ans[action.payload.index].answer[i] != action.payload.answer[i])
  //           flag = 1;
  //       }
  //       if (flag == 0) ans[action.payload.index].isAnsweredWrong = false;
  //       else ans[action.payload.index].isAnsweredWrong = true;
  //     }
  //   }
//   const an=ans[action.payload.index].answer.toString().split(',');





  if (data.answerType == 1) {
    if (data.answer == action.payload.answer)
      data.isAnsweredWrong = false;
    else data.isAnsweredWrong = true;
  } else if (data.answerType == 2) {
    if (
        // data.answer[0] <= action.payload.answer &&
        // data.answer[1] >= action.payload.answer
        data.answer <= action.payload.answer ||
        (Math.round((Number(data.answer)+0.01)*100)/100) >= action.payload.answer
    ) {
      data.isAnsweredWrong = false;
    } else data.isAnsweredWrong = true;
  } else if (data.answerType == 4) {
    console.log(data.answer, action.payload.answer);
    if (data.answer == action.payload.answer || data.answer[0] == action.payload.answer) {
      console.log("kyu");
      data.isAnsweredWrong = false;
    } else {
      console.log("yo");
      data.isAnsweredWrong = true;
    }
  } else if (data.answerType == 5) {
    let flag = 0;
    for (let i = 0; i < 4; i++) {
      if (data.answer[i] != action.payload.answer[i])
        flag = 1;
    }
    if (flag == 0) data.isAnsweredWrong = false;
    else data.isAnsweredWrong = true;
  }

  //if paper is a MOCKTEST or PREVIOUS YEAR, store it in local storage
  // if(state.storeAnswers==true) {
  //     let paperToStore={
  //         time:state.time,
  //         answers:ans
  //     }
  //     let papersFromLocalStorage={...JSON.parse(localStorage.getItem(state.uid))}
  //     papersFromLocalStorage[state.paper.name]=paperToStore
  //     localStorage.setItem(state.uid, JSON.stringify(papersFromLocalStorage))
  // }

  return {
    ...state,
    answers: ans,
  };
};

//removing isAnswered, isAnsweredWrong and answerGiven
const clearAnswer = (state, action) => {
  const ans = [...state.answers];
  ans[action.payload.index].isAnswered = false;
  ans[action.payload.index].isAnsweredWrong = false;
  ans[action.payload.index].answerGiven = "";

  //if paper is a MOCKTEST or PREVIOUS YEAR, store it in local storage
  // if(state.storeAnswers==true) {
  //     let paperToStore={
  //         time:state.time,
  //         answers:ans
  //     }
  //     let papersFromLocalStorage={...JSON.parse(localStorage.getItem(state.uid))}
  //     papersFromLocalStorage[state.paper.name]=paperToStore
  //     localStorage.setItem(state.uid, JSON.stringify(papersFromLocalStorage))
  // }

  return {
    ...state,
    answers: ans,
  };
};

//setting isBookmarked to true
const bookmarkQuestion = (state, action) => {
  const ans = [...state.answers];
  ans[action.payload.index].isBookmarked =
    !ans[action.payload.index].isBookmarked;

  //if paper is a MOCKTEST or PREVIOUS YEAR, store it in local storage
  // if(state.storeAnswers==true) {
  //     let paperToStore={
  //         time:state.time,
  //         answers:ans
  //     }
  //     let papersFromLocalStorage={...JSON.parse(localStorage.getItem(state.uid))}
  //     papersFromLocalStorage[state.paper.name]=paperToStore
  //     localStorage.setItem(state.uid, JSON.stringify(papersFromLocalStorage))
  // }

  return {
    ...state,
    answers: ans,
  };
};

//for attempting subjective questions
const attemptSubjective = (state, action) => {
  const ans = [...state.answers];
  ans[action.payload.index].isAnswered = true;
  console.log("Attempting Subjective", ans);
  return {
    ...state,
    answers: ans,
  };
};

const MockTestReducer = (state = initValues, action) => {
  switch (action.type) {
    case actionTypes.RESTORE_PREVIOUS_ATTEMPT:
      return restorePreviousAttempt(state, action);
    case actionTypes.SET_NEW_ATTEMPT_TIME:
      return setNewAttemptTime(state, action);
    case actionTypes.FETCH_PAPER:
      return fetchPaper(state, action);
    case actionTypes.FETCH_PREVIOUS_ANSWERS:
      return fetchPreviousSubjectwiseAnswers(state, action);
    case actionTypes.SET_SEEN:
      return setSeen(state, action);
    case actionTypes.SET_ANSWER:
      return setAnswer(state, action);
    case actionTypes.CLEAR_ANSWER:
      return clearAnswer(state, action);
    case actionTypes.BOOKMARK_QUESTION:
      return bookmarkQuestion(state, action);
    case actionTypes.ATTEMPT_SUBJECTIVE:
      return attemptSubjective(state, action);
    default:
      return state;
  }
};
export default MockTestReducer;
