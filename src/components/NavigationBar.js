import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

class NavigationBar extends Component{

    handleLogout = () => {
        const { dispatch } = this.props

        dispatch(setAuthedUser(null))
    }

    render() {

        const { user } = this.props

        return (

            <Navbar bg='primary' variant='dark' expand='lg'>
                <Container>
                    <Navbar.Brand href='/'>Would You Rather</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <NavLink exact to='/' className='nav-link'>Home</NavLink>
                            <NavLink to='/add' className='nav-link'>New Question</NavLink>
                            <NavLink to='/leaderboard' className='nav-link'>Leader Board</NavLink>
                        </Nav>
                        <Nav>
                            <img className='avatar-nav' src={user.avatarURL} alt={`Avatar of ${user.name}`}/>
                            <NavDropdown title={`Welcome ${user.name}`} id='basic-nav-dropdown' active>
                                <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

function mapStateToProps({ users,authedUser }) {
    return {
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(NavigationBar)