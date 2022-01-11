import {GET_ALL_USERS} from "../actions/users";
import {SAVE_ANSWER, SAVE_QUESTION} from "../actions/questions";

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                ...action.users
            }

        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }

        case SAVE_ANSWER:
            return {
                ...state,
                [action.question.authedUser]: {
                    ...state[action.question.authedUser],
                    answers: {
                        ...state[action.question.authedUser].answers,
                        [action.question.id]: action.question.answer
                    }

                }
            }

        default:
            return state
    }
}