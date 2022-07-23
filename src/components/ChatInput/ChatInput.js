import React from 'react';

import './ChatInput.css';

const ChatInput = (props) => {
    return (
        <div className='chatInputDiv'>
                <input type="text" value={props.message} onChange={(e) => {
                    props.setMessage(e.target.value)
                }} className='chatInput' onKeyPress={e => e.key === 'Enter' ? props.sendMessage(e) :  null }/>
                <button type='submit' className='chatInputBtn' onClick={e => props.sendMessage(e)}>SEND</button>
        </div>
    )
}

export default ChatInput;