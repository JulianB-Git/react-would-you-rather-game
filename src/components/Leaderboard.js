import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderboardCard from "./LeaderboardCard";
import { Container, Row } from "react-bootstrap";


class Leaderboard extends Component {
    render() {

        const { userIds } = this.props

        return (
            <Container className='mt-3' >
                {userIds.map((id) => (
                    <Row key={id} className='justify-content-md-center'>
                        <LeaderboardCard id={id} />
                    </Row>
                ))}
            </Container>
        )
    }
}

function mapStateToProps({ users }) {

    //Calculates each users score and adds a score field to the user object
    for (const user in users) {

        const answeredQuestions = Object.keys(users[user].answers).length
        const createdQuestions = users[user].questions.length

        users[user].score = answeredQuestions + createdQuestions
    }

    return {
        //Sort the id's passed to the LeaderboardCard component based on the new score field added (Highest to lowest score)
        userIds: Object.keys(users).sort((a,b) => users[b].score - users[a].score)
    }
}

export default connect(mapStateToProps)(Leaderboard)