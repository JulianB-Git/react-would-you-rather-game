import React, { Component } from "react";
import { Container, Tab, Tabs, Row } from "react-bootstrap";
import Questions from "./Questions";
import {connect} from "react-redux";
import { handleInitialQuestions } from "../actions/questions";

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialQuestions())
    }

    //Manage the active tab with state
    state = {
        tab: 'Unanswered'
    }

    setTab = (tab) => {
        this.setState(() => ({
            tab: tab
        }))
    }

    render() {

        const { answeredQuestionsIds, unAnsweredQuestions, loading } = this.props
        const { tab } = this.state

        return (
            <Container>
                {loading === true ? null:
                    <Row className='justify-content-md-center'>
                        <div className='container-tabs'>
                            <Tabs
                                defaultActiveKey='Unanswered'
                                id='controlled-tab'
                                activeKey={tab}
                                onSelect={(tab) => this.setTab(tab)}
                                fill
                            >
                                <Tab eventKey='Unanswered' title='Unanswered Questions'>
                                    <ul>
                                        {unAnsweredQuestions.map((id) => (
                                            <li key={id}>
                                                <Questions id={id} />
                                            </li>
                                        ))}
                                    </ul>
                                </Tab>
                                <Tab eventKey='Answered' title='Answered Questions'>
                                    <ul>
                                        {answeredQuestionsIds.map((id) => (
                                            <li key={id}>
                                                <Questions id={id} />
                                            </li>
                                        ))}
                                    </ul>
                                </Tab>
                            </Tabs>
                        </div>
                    </Row>}
            </Container>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }) {

    const ansQuestions = Object.keys(users[authedUser].answers)
    const unAnsQuestions = []

    //Sort the questions array based on timestamp (Most recent to least)
    const questionsArray = Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp)

    //See if the answered questions array(for the user) includes id's from the questions array, if it does not then add it to a unanswered questions array
    questionsArray.map((id) => {
        return !ansQuestions.includes(id) ? unAnsQuestions.push(id) : null
    })

    //Sort the answered questions array based on the order of the questions array
    ansQuestions.sort((a,b) => {
        return questionsArray.indexOf(a) - questionsArray.indexOf(b)
    })

    return {
        loading: Object.keys(questions).length === 0,
        answeredQuestionsIds: ansQuestions,
        unAnsweredQuestions: unAnsQuestions
    }
}

export default connect(mapStateToProps)(Home)

