
import './App.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App() {

  return (
    <>
     <h1>Chat App</h1>
    </>
  )
}

export default App
