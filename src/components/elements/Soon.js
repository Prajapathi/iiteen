import React from 'react';
import { Container } from 'react-bootstrap';
import soon from '../../assets/images/undraw_studying_s3l7.svg'
const Soon = () => {
    return (
        <div>
            <Container>
            <div style={{height:'80vh', textAlign:'center', color:'#498E9C'}}>
                <img src ={soon} style={{width: '60%', maxHeight:'300px', marginTop:'50px'}}/>
                <h1>Coming Soon</h1>
            </div>
            </Container>
        </div>
    );
};

export default Soon;