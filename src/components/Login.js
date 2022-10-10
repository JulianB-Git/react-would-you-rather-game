import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Container, Card, Form, Button, Row } from "react-bootstrap";
import ReactLogo from '../assets/logo192.png'
import {mToast} from "react-redux-toasts";

class Login extends Component{

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        const value = e.target[0].value

        if (value === 'default'){
            return mToast.error({text: "Please select a user before continuing"})
        }

        dispatch(setAuthedUser(value))

        //Navigate to the last entered URL after clicking login
        this.props.history.push('/')//this.props.match.params
    }

    render() {

        const { users } = this.props

        return (
            <Container>
                <Row className='justify-content-md-center'>
                    <Card className='login-page'>
                        <Card.Header>
                            <h5>Welcome to Would You Rather App!</h5>
                            <Card.Text>Please sign in to continue</Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <img src={ReactLogo} alt='React Logo'/>
                            <Form className='form-login' onSubmit={this.handleSubmit} >
                                <Form.Control as='select' className='mb-3' defaultValue='default'>
                                    <option value='default' disabled>Select User</option>
                                    {Object.keys(users).map((id, index) => (
                                        <option key={index} value={users[id].id}>{users[id].name}</option>
                                    ))}
                                </Form.Control>
                                <Button type='submit'>LOGIN</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    const userNames = []

    //Returns an array of usernames
    Object.keys(users).forEach((id) => {
        return userNames.push(users[id].name)
    })

    return {
        userNames: userNames,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login))