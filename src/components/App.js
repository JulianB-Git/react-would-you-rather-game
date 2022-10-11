import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialUsers } from "../actions/users";
import Login from "./Login";
import LoadingBar from 'react-redux-loading'
import Home from "./Home";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Nav from "./NavigationBar";
import ViewQuestion from "./ViewQuestion";
import NotFound from "./NotFound";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialUsers())
    }

    render() {
        return (
            <Router basename={this.props.baseUrl}>
                <Fragment>
                    <LoadingBar/>
                    <div>
                        {this.props.authedUser === null
                            ? <Login/>
                            : <div>
                                <Nav />
                                <LoadingBar/>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route exact path='/add' component={NewQuestion} />
                                    <Route exact path='/leaderboard' component={Leaderboard } />
                                    <Route exact path='/questions/:question_id' component={ViewQuestion } />
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>}
                    </div>
                    <div className='footer-div'>
                        <div className='footer'>All avatar images used were created by <a href='https://www.iconfinder.com/laurareen'>Laura Reen</a>, in the <a href='https://www.iconfinder.com/iconsets/avatars-xmas-giveaway'>X-Mas Icon pack</a>, licenced under <a href='https://creativecommons.org/licenses/by-nc/3.0/legalcode'>CC Attribution-NonCommercial</a></div>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
        baseUrl: window.location.pathname
    }
}

export default connect(mapStateToProps)(App);
