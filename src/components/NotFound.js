import React from "react";
import { Link } from 'react-router-dom'
import { Container, Row } from "react-bootstrap";
import { BsFillExclamationOctagonFill } from 'react-icons/bs'

const NotFound = () => {
    return (
        <Container className='mt-3'>
            <Row className='justify-content-md-center' style={{textAlign: "center"}}>
                <BsFillExclamationOctagonFill className='error-icon'/>
                <h1>404 - Not Found!</h1>
                <Link to='/'>Go Home</Link>
            </Row>
        </Container>
    )
}

export default NotFound