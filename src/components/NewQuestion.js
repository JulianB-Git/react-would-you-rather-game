import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { mToast } from "react-redux-toasts";
import { handleAddQuestion } from "../actions/questions";
import { Container, InputGroup, FormControl, Button, Row } from "react-bootstrap";

class NewQuestion extends Component{

    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChangeOptionOne = (e) => {
        const optionOne = e.target.value

        this.setState(() => ({
            optionOne
        }))
    }

    handleChangeOptionTwo = (e) => {
        const optionTwo = e.target.value

        this.setState(() => ({
            optionTwo
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state
        const { dispatch, authedUser } = this.props

        if (optionOne === '' || optionTwo === '' ) {
            return mToast.error({text: "Please enter all fields before submitting"})
        }

        dispatch(handleAddQuestion(optionOne, optionTwo, authedUser))

        this.setState(() => ({
            optionOne: '',
            optionTwo: ''
        }))

        this.props.history.push('/')
    }

    render() {

        const { user } = this.props
        const { optionOne, optionTwo } = this.state

        return (
            <Container className='mt-3'>
                <Row className='justify-content-md-center'>
                    <div className='custom-card'>
                        <h4 className='custom-card-header'>{`${user.name} asks would you rather:`}</h4>
                        <div className='custom-card-body'>
                            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar'/>
                            <div className='vl' />
                            <div >
                                <form className='card-content' onSubmit={this.handleSubmit}>
                                    <InputGroup size='sm' className='mt-2'>
                                        <InputGroup.Text>Option A</InputGroup.Text>
                                        <FormControl placeholder='e.g Be superman' value={optionOne} onChange={this.handleChangeOptionOne} />
                                    </InputGroup>
                                    <span className='mt-2' style={{alignSelf: "center"}}>OR</span>
                                    <InputGroup size='sm' className='mt-2'>
                                        <InputGroup.Text>Option B</InputGroup.Text>
                                        <FormControl placeholder='e.g Be Batman' value={optionTwo} onChange={this.handleChangeOptionTwo}/>
                                    </InputGroup>
                                    <Button className='mt-2' variant='outline-success' type='submit'>Submit</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return{
        user: users[authedUser],
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))