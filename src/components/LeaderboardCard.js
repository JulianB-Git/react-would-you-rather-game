import React, { Component } from 'react'
import { connect } from "react-redux";
import { Card } from 'react-bootstrap'
import { BsAward } from "react-icons/bs"

class LeaderboardCard extends Component {
    render() {

        const { answeredQuestions, createdQuestions, user } = this.props

        return (
            <Card className='leaderboard-card'>
                <Card.Img variant='left' src={user.avatarURL} className='avatar'/>
                <Card.Body>
                    <Card.Title>{user.name.toUpperCase()}<BsAward className='leaderboard-badge'/></Card.Title>
                    <Card.Text>{`Answered Questions: ${answeredQuestions}`}</Card.Text>
                    <hr/>
                    <Card.Text>{`Created Questions: ${createdQuestions}`}</Card.Text>
                </Card.Body>
                <Card className='score-card'>
                    <Card.Header>Score</Card.Header>
                    <Card.Body >
                        <Card.Text className='score-total-circle'>{answeredQuestions+createdQuestions}</Card.Text>
                    </Card.Body>
                </Card>
            </Card>
        )
    }
}

function mapStateToProps({ users }, { id }) {

    //Create variables for answered and created questions for the user id passed in as a prop
    const answeredQuestions = Object.keys(users[id].answers).length
    const createdQuestions = users[id].questions.length

    return {
        user: users[id],
        answeredQuestions,
        createdQuestions
    }
}

export default connect(mapStateToProps)(LeaderboardCard)