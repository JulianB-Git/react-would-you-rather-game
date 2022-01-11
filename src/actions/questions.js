import {_getQuestions, _saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import {hideLoading, showLoading} from "react-redux-loading";

export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function getAllQuestions(questions) {
    return {
        type: GET_ALL_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function saveAnswer(question) {
    return {
        type: SAVE_ANSWER,
        question
    }
}

export function handleAddQuestion(optionOne, optionTwo, authedUser) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(hideLoading())
            })
    }
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(() => {
                dispatch(saveAnswer({ authedUser, id: qid, answer }))
                dispatch(hideLoading())
            })
    }
}

export function handleInitialQuestions() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getQuestions()
            .then((questions) => {
                dispatch(getAllQuestions(questions))
                dispatch(hideLoading())
            })
    }
}