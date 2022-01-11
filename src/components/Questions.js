import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom'

class Questions extends Component{

    handleViewPoll = (e) => {
        e.preventDefault()
        this.props.history.push(`/questions/${e.target.id}`)
    }

    render() {
        const { question, authorUser } = this.props

        return (
            <div>
                <h4 className='custom-card-header'>{`${authorUser.name} asks:`}</h4>
                <div className='custom-card-body'>
                    <img src={authorUser.avatarURL} alt={`Avatar of ${authorUser.name}`} className='avatar'/>
                    <div className='vl' />
                    <div className='question-info'>
                        <h5>Would You Rather</h5>
                        <span style={{alignSelf: "center"}}>{`...${question.optionOne.text.substring(0, 15)}...`}</span>
                        <Button id={question.id} onClick={this.handleViewPoll}>View Poll</Button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users }, { id }) {
    return {
        question: questions[id],
        authorUser: users[questions[id].author]
    }
}

export default withRouter(connect(mapStateToProps)(Questions))