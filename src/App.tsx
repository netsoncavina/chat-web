
import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {
   const [name, setName] = useState('')
   const [roomId, setRoomId] = useState('')

  const joinRoom = () => {
    if (name && roomId) {
      socket.emit('joinRoom', roomId)
    }
  }

  return (
    <>
     <h1>Chat App</h1>

      <div>
        <input type="text" placeholder="Enter your name"  onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Enter your room id"  onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={joinRoom}>Join Room</button>
      </div>


    </>
  )
}

export default App
