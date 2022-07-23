import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import '../SignIn/SignIn.css';

let socket;

const SignIn = (props) => {

    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');
    const [room, setRoom] = useState('Global');
    

    const onSubmit = (event) => {
        event.preventDefault();
        fetch(`${props.dbUrl}signIn`, {
            body: JSON.stringify({
                username: userName,
                password: passWord
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(json => {
            if(json.error) {
                setUserName('');
                setPassword('');
                alert(json.error);
            } else {
                props.setTempUser(json);
                console.log(`signIn json: ${Object.entries(json)}`)
                // props.addUser(json, json.user._id);
                props.setView('ChatRoom');
            }
        })
    }

    return (
        <div className='signInDiv'>
            <div className='headingDiv'>
                <h1 className='heading'>Sign In</h1>
            </div>
            <div className='signInFormDiv'>
                <form onSubmit={(event) => {
                    onSubmit(event);
                }} className='signInForm'>
                    <div className='signInInputDiv'>
                        <input placeholder='Username' type='text' className='signInInput' onChange={(event) => setUserName(event.target.value)} />
                    </div>
                    <div className='signInInputDiv'>
                        <input placeholder='Password' type='password' className='signInInput' onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className='signInSubmitBtn'>
                        <button className='signInBtn' type='submit'>Sign In</button>
                    </div>
                </form>
            </div>
            <div className='newUserBtnDiv'>
                <button className='signInBtn' onClick={() => {
                    props.setView('NewUser')
                }}>New User</button>
            </div>
        </div>
    )
}

export default SignIn;