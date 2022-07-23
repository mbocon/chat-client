import React, { useState } from 'react';

import './SideNav.css';
import OnlineIcon from '../icons/online-icon.png';

const SideNav = (props) => {

    const [editMode, setEditMode] = useState(false);

    const processSubmit = (event) => {
        props.createRoom(event);
        setEditMode(!editMode);
    }

    return (
        <div className='sideNavDiv'>
            <div className='online-div'>
                <img className='online-icon' src={OnlineIcon} onClick={() => {
                    props.setEditProfile(!props.editProfile)
                }}/>
                <div className='current-room'>{props.currentRoom}</div>
            </div>
            <select className='activeRooms' onChange={(event) => {
                console.log(`target value: ${event.target.value}`)
                props.getRoomMsgs(event.target.value)
                // props.updateTempUserRoom(event.target.value)
                // props.switchRoom(event);
            }}>
                <option selected='selected'>Rooms</option>
                {Object.keys(props.rooms).map((val) => {
                    // console.log(`props.rooms[${val}]: ${props.rooms[val]}`)
                    return <option value={val}>{`${val}: ${props.rooms[val]} chatting`}</option>
                })}
            </select>
            <button className='createRoomBtn' onClick={() => setEditMode(!editMode)}>Create Room</button>
            { editMode === true && 
            <input 
                className='createRoomInput'
                type='text'
                value={props.newRoom}
                onChange={(e) => props.setNewRoom(e.target.value)}
                placeholder='Add Room'
                onKeyPress={e => e.key === 'Enter' ? processSubmit(e) : null}
                />
            }
            <div className='lgScreenRoomsDiv'>
                <div className='lgScreenRoomsHeading'>
                    Rooms:
                </div>
                {
                    Object.keys(props.rooms).map((val) => {
                        return (
                            <div className='lgScreenRoomNameDiv'>
                                {`${val}: ${props.rooms[val]} chatting`}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SideNav;