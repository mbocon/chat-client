import React, {useState} from 'react';

import '../EditUser/EditUser.css';

const EditUser = (props) => {

    const [username, setUsername] = useState(props.tempUser.user.username);

    const editUser = (e) => {
        e.preventDefault();
        fetch(`${props.dbUrl}users/${props.tempUser.user.username}`, {
            body: JSON.stringify({
                username: username
            }),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className='editUserDiv'>
            <div className='editHeadingDiv'>
                <h1 className='editHeading'>Edit Profile</h1>
            </div>
            <form className='editUserForm' onSubmit={(e) => {
                editUser(e);
            }}>
                <div className='editUserInputDiv'>
                    <input className='editUserInput' type='text' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div className='editUserBtnDiv'>
                    <button className='editUserBtn' type='submit'>Save Changes</button>
                </div>
                <div className='editUserBtnDiv'>
                    <button className='editUserBtn'>Delete Profile</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser;