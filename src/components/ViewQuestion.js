import React, { Component } from 'react'
import { connect } from "react-redux";
import AnswerPoll from "./AnswerPoll";
import ViewPoll from "./ViewPoll";
import {handleInitialQuestions} from "../actions/questions";

class ViewQuestion extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialQuestions())
    }

    render() {

        const { id, isAnswered, loading } = this.props

        if (loading){
            return null
        }

        return (
            <div>
                {isAnswered ? <ViewPoll id={id}/> : <AnswerPoll id={id}/>}
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser, loadingBar, questions }, props) {

    const { question_id } = props.match.params

    return {
        id: question_id,
        isAnswered: Object.keys(users[authedUser].answers).includes(question_id),
        loading: !Object.keys(questions).length
    }
}

export default connect(mapStateToProps)(ViewQuestion)