import JoinBlock from "./components/JoinBlock";
import {useEffect, useReducer} from "react";

import socket from "./socket/Socket";

import {reducer} from "./reducer/reducer";
import Chat from "./components/Chat";
import axios from "axios";


function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })

    const onLogin = async obj => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj)
        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        dispatch({
            type: 'SET_DATA',
            payload: data
        })
    }

    const setUsers = users => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }

    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        })
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE', addMessage)
    }, [])


    window.socket = socket

    return (
        <div>
            {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat onAddMessage={addMessage} {...state}/>}
        </div>
    );
}

export default App;
