import {GET_ALL_QUESTIONS, SAVE_ANSWER, SAVE_QUESTION} from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }

        case SAVE_ANSWER:
            return {
                ...state,
                [action.question.id]: {
                    ...state[action.question.id],
                    [action.question.answer]: {
                        ...state[action.question.id][action.question.answer],
                        votes: state[action.question.id][action.question.answer].votes.concat(action.question.authedUser)
                    }
                }
            }

        default:
            return state
    }
}