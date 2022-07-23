import React, { useState, useEffect } from 'react';

import './SignUp.css';


const SignUp = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('')
    const [room, setRoom] = useState('Global');
    const [sysMsg, setSysMsg] = useState('');

    const onSubmit = (event) => {
        console.log('signup submit ran')
        event.preventDefault();


        if ( username === '' || password === '' || confirmPass === '') {
            setSysMsg('All fields are required');
        } else {
            fetch(`${props.dbUrl}signUp`, {
                body: JSON.stringify({
                    username: username,
                    password: password,
                    password2: confirmPass
                }),
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            // .then(resp => console.log(resp))
            .then(resp => resp.json())
            .then(json => {
                console.log(`here is the json: ${Object.entries(json)}`)
                if (json.errors) {
                    alert('there was an error')
                } else {
                    props.setTempUser(json)
                    props.setView('ChatRoom');
                }
            })
        }
    }

    return(
        <div className='signUpDiv'>
            <div className='signUpHeadingDiv'>
                <h1 className='heading'>Sign Up</h1>
            </div>
            <div className='signUpFormDiv'>
                <form className='signInForm' onSubmit={(event) => {
                    if (password === confirmPass) {
                        onSubmit(event)
                    } else {
                        setSysMsg('passwords do not match');
                    }
                }}>
                    <div className='signUpInputDiv'>
                        <input className='signInInput' type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className='signUpInputDiv'>
                        <input className='signInInput' type='password' placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className='signUpInputDiv'>
                        <input className='signInInput' type='password' placeholder='Confirm Password' onChange={(event) => setConfirmPass(event.target.value)}/>
                    </div>
                    <div className='signUpSubmitBtn'>
                        <button className='signInBtn' type='submit'>Sign Up!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;