import React, {useState} from 'react';
import axios from "axios";

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Неверные данные')
        } else {
            const obj = {
                roomId,
                userName
            }
            setLoading(true)
            try {
                await axios.post('/rooms', {
                    roomId,
                    userName
                })
            } catch (e) {
                console.log(e)
            }
            onLogin(obj)
        }
    }

    return (
        <div className="container form-control-color mt-3">
            <input
                onChange={e => setRoomId(e.target.value)}
                value={roomId}
                placeholder="Room ID"
                type="text"
            />
            <input
                onChange={e => setUserName(e.target.value)}
                value={userName}
                placeholder="Enter your name"
                type="text"
            />
            <button
                disabled={isLoading}
                onClick={onEnter}
                className='btn-success'
            >{isLoading ? 'Login...' : 'Enter'}</button>
        </div>
    );
};

export default JoinBlock;