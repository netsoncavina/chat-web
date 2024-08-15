import React from 'react'
import { Socket } from 'socket.io-client'

    interface ChatProps {
      socket: Socket,
      username: string,
      roomId: string,
    }

function Chat({socket , username, roomId}: ChatProps) {
    // const [messages, setMessages] = React.useState([])
    const [currentMessage, setCurrentMessage] = React.useState('')

 const sendMessage = async () => {
    if (currentMessage.length > 0) {
      const messageData = {
        roomId: roomId,
        author: username,
        message: currentMessage,
        time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes() 
      };
      await socket.emit('sendMessage', messageData)
      setCurrentMessage('')
    }
 }
  return (
    <div>
        <div className='chat-header'>
            <h1>Chat</h1>
        </div>
        <div className='chat-body'>
            
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='Type a message...'  value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
        </div>


    </div>
  )
}

export default Chat