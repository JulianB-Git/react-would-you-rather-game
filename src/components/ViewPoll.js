import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Card, Row, ProgressBar } from "react-bootstrap";
import NotFound from "./NotFound";

class ViewPoll extends Component {
    render() {

        const { user, question, authedUser, error, numOptionOne, numOptionTwo, totalVotes, optionOnePercent, optionTwoPercent } = this.props

        return (
            <div>
                {!error ?
                    <Container className='mt-3'>
                        <Row className='justify-content-md-center'>
                            <div className='custom-card'>
                                <h4 className='custom-card-header'>{`Asked by ${user.name}`}</h4>
                                <div className='custom-card-body'>
                                    <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar'/>
                                    <div className='vl' />
                                    <div className='card-content'>
                                        <h4 className='mt-2'>Results:</h4>
                                        <Card className='mt-2'>
                                            {question.optionOne.votes.includes(authedUser) && (
                                                <div className='vote-sticker'>Your Vote</div>
                                            )}
                                            <Card.Body>
                                                <Card.Text>{`Would you rather ${question.optionOne.text}`}</Card.Text>
                                                <ProgressBar variant='success' now={optionOnePercent} label={`${optionOnePercent.toFixed(2)}%`}/>
                                                <Card.Text style={{textAlign: "center"}}>{`${numOptionOne} out of ${totalVotes} votes`}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card className='mt-2'>
                                            {question.optionTwo.votes.includes(authedUser) && (
                                                <div className='vote-sticker'>Your Vote</div>
                                            )}
                                            <Card.Body>
                                                <Card.Text>{`Would you rather ${question.optionTwo.text}`}</Card.Text>
                                                <ProgressBar  variant='success' now={optionTwoPercent} label={`${optionTwoPercent.toFixed(2)}%`}/>
                                                <Card.Text style={{textAlign: "center"}}>{`${numOptionTwo} out of ${totalVotes} votes`}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Container>
                :<NotFound/>}
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {

    //In the case of entering a questions id into the URL, catch the error and return
    try {

        //Variables for number of votes on each question and return as props
        const numOptionOne = questions[id].optionOne.votes.length
        const numOptionTwo = questions[id].optionTwo.votes.length
        const totalVotes = numOptionOne + numOptionTwo

        const optionOnePercent = numOptionOne/totalVotes * 100
        const optionTwoPercent = numOptionTwo/totalVotes * 100

        return {
            question: questions[id],
            user: users[questions[id].author],
            authedUser,
            numOptionOne,
            numOptionTwo,
            totalVotes,
            optionOnePercent,
            optionTwoPercent
        }
    } catch (e) {
        return {
            error: true
        }
    }
}

export default connect(mapStateToProps)(ViewPoll)