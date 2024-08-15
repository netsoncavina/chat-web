import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'

    interface ChatProps {
      socket: Socket,
      username: string,
      roomId: string,
    }

    interface Message {
      roomId: string,
      author: string,
      message: string,
      time: string,
    }
function Chat({socket , username, roomId}: ChatProps) {
    const [messagesList, setMessagesList] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState('')

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
      setMessagesList([...messagesList, messageData])
    }
 }

 useEffect(() => {  
    socket.on('receiveMessage', (messageData) => {
        // console.log(messageData)
      setMessagesList([...messagesList, messageData])
    })
  }, [socket , messagesList])
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
                {messagesList.map((message, index) => (
                    <div className='message' key={index} id={username ===  message.author ? `you` : `other`}>
                        <div>
                            <div className='message-content'>
                                <p>{message.message}</p></div>
                            <div className='message-meta'>
                                <p id='time'>{message.time}</p>
                                <p id= 'author'>{message.author}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='Type a message...'  value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}/>
            <button onClick={sendMessage}>Send</button>
        </div>


    </div>
  )
}

export default Chat