import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveAnswer } from "../actions/questions";
import {Container, Row, Button, Form} from "react-bootstrap";
import {mToast} from "react-redux-toasts";
import NotFound from "./NotFound";

class AnswerPoll extends Component {

    state = {
        answer: '',
        isInvalid: false
    }

    handleOnChange = (e) => {
        e.persist()

        const answer = e.target.id

        this.setState(() => ({
            answer,
            isInvalid: false
        }))
    }

    handleAnswer = (e) => {
        e.preventDefault()

        const { answer } = this.state
        const { dispatch, authedUser, question } = this.props

        if (answer === ''){
            this.setState(() => ({
                isInvalid: true,
            }))

            return mToast.error({text: "Please select an answer before submitting"})
        }

        dispatch(handleSaveAnswer(authedUser, question.id, answer))
    }

    render() {

        const { question, user, error } = this.props
        const { isInvalid } = this.state

        return (
            <div>
                {!error ?
                    <Container className='mt-3'>
                        <Row className='justify-content-md-center'>
                            <div className='custom-card'>
                                <h4 className='custom-card-header'>{`${user.name} asks: `}</h4>
                                <div className='custom-card-body'>
                                    <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar'/>
                                    <div className='vl' />
                                    <form className='card-content' onSubmit={this.handleAnswer}>
                                        <h4 className='mt-2'>Would you rather...</h4>
                                        <Form.Group>
                                            <Form.Check className='mt-2' onChange={this.handleOnChange} type='radio' name='group' id='optionOne' label={question.optionOne.text} isInvalid={isInvalid}/>
                                            <Form.Check className='mt-2' onChange={this.handleOnChange} type='radio' name='group' id='optionTwo' label={question.optionTwo.text} isInvalid={isInvalid}/>
                                        </Form.Group>
                                        <Button className='mt-2' variant='outline-success' type='submit'>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </Row>
                    </Container>
                :<NotFound/>}
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {

    //In the case of entering a questions id into the URL, catch the error and return
    try {
        return {
            question: questions[id],
            user: users[questions[id].author],
            authedUser
        }
    } catch (e) {
        return {
            error: true
        }
    }
}

export default connect(mapStateToProps)(AnswerPoll)