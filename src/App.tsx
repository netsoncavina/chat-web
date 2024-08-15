
import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Chat'

const socket = io('http://localhost:3001')

function App() {
   const [name, setName] = useState('')
   const [roomId, setRoomId] = useState('')
   const [hasJoined, setHasJoined] = useState(false)

  const joinRoom = () => {
    if (name && roomId) {
      socket.emit('joinRoom', roomId)
      setHasJoined(true)
    }
  }

  return (
    <div className="App">

     {!hasJoined ?
     ( <div className="joinChatContainer">
       <h1>Chat App</h1>
        <input type="text" placeholder="Enter your name"  onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Enter your room id"  onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>)
      :
      
     ( <div className="chatContainer">
        <h2>Chat</h2>
        <Chat socket={socket}  username={name} roomId={roomId} />
      </div>)
    }

    </div>
  )
}

export default App
