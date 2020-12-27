import * as actionTypes from '../action/actionTypes'

const initValues={
    paper:{},
    answers:[],
}

const fetchPaper=(state,action)=>{
    
    let ans=[];
    if(state.answers.length==0){
        for(let i=0;i<action.payload.noOfQuestions;i++){
            ans.push({
                qid:action.payload.questions[i].qid,
                number:i,
                answer:action.payload.questions[i].answer,
                answerGiven:action.payload.questions[i].answerType==5?[]:null,
                answerType:action.payload.questions[i].answerType,
                marks:action.payload.questions[i].marks,
                isSeen:false,
                isBookmarked:false,
                isAnsweredWrong:false,
                isAnswered:false
            })
        }
    }
    
    console.log(ans,"ooop")
    return{
        ...state,
        paper:action.payload,
        answers:ans.length==0?state.answers:ans
    }
}
const setSeen=(state,action)=>{
    if(action.payload.index<0)
        return state
    const ans=[...state.answers]
    ans[action.payload.index].isSeen=true
    return{
        ...state,
        answers:ans
    }
}
const setAnswer=(state,action)=>{
    const ans=[...state.answers]
    ans[action.payload.index].answerGiven=action.payload.answer
    ans[action.payload.index].isAnswered=true
    switch(ans[action.payload.index].answerType){
        case 1:{
            if(ans[action.payload.index].answer===action.payload.answer)
                ans[action.payload.index].isAnsweredWrong=false;
            else 
                ans[action.payload.index].isAnsweredWrong=true;
            break;
        }
        case 2:{
            if(ans[action.payload.index].answer[0]>=action.payload.answer && ans[action.payload.index].answer[1]<=action.payload.answer)
                 ans[action.payload.index].isAnsweredWrong=false;
            else 
                 ans[action.payload.index].isAnsweredWrong=true;
        }
        case 4:{
            
         if(ans[action.payload.index].answer===action.payload.answer){
                console.log("kyu")
                ans[action.payload.index].isAnsweredWrong=false;
            }
            else {
                console.log("yo")
                ans[action.payload.index].isAnsweredWrong=true;
            }

            break;

        }
        case 5:{
            let flag=0;
            for(let i=0;i<4;i++){
                if(ans[action.payload.index].answer[i]!=action.payload.answer[i])
                    flag=1;
            }
            if(flag==0)
                ans[action.payload.index].isAnsweredWrong=false;
            else 
                ans[action.payload.index].isAnsweredWrong=true;

        }
    }
    console.log("kkk",ans)
    return{
        ...state,
        answers:ans
    }
}

const clearAnswer=(state,action)=>{
    const ans=[...state.answers]
    ans[action.payload.index].isAnswered=false
    ans[action.payload.index].isAnsweredWrong=false
    ans[action.payload.index].answerGiven=''
    console.log("popo",ans)
    return{
        ...state,
        answers:ans
    }
}

const bookmarkQuestion=(state,action)=>{
    const ans=[...state.answers]
    ans[action.payload.index].isBookmarked=!ans[action.payload.index].isBookmarked
    console.log("po",ans)
    return{
        ...state,
        answers:ans
    }
}


const MockTestReducer=(state=initValues,action)=>{
    switch(action.type){
        case actionTypes.FETCH_PAPER:
            return fetchPaper(state,action)
        case actionTypes.SET_SEEN:
            return setSeen(state,action)
        case actionTypes.SET_ANSWER:
            return setAnswer(state,action)
        case actionTypes.CLEAR_ANSWER:
            return clearAnswer(state,action)
        case actionTypes.BOOKMARK_QUESTION:
            return bookmarkQuestion(state,action)
        default:
            return state
    }
}
export default MockTestReducer;