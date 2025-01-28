import { Server, Namespace, Socket } from 'socket.io'
import { messageService } from '../config/container'

const connectedUsers = new Map<string, string>()

const chatSocketHandler = (namespace: Namespace, socket: Socket) => {
    
    const userId = socket.handshake.auth.userId
    
    if (!userId) {
        socket.disconnect()
        return
    }


    connectedUsers.set(userId, socket.id)
    

    socket.on('chat-user_join', ({ userId }) => {
        
        if (!userId) {
            console.error('Invalid user_join event: no userId provided')
            return
        }
        socket.data.userId = userId
    })

    socket.on('chat-private_message', async ({ to, message }, callback) => {
        try {
            
            const sender = socket.data.userId
            if (!sender || !to || !message) {
                console.error('Invalid chat-private_message event:', { sender, to, message })
                callback?.({ error: 'Invalid message data' })
                return
            }

            
            await messageService.saveMessage(sender, to, message)

            // Get recipient's socket ID from our map
            const recipientSocketId = connectedUsers.get(to)
            if (recipientSocketId) {
                namespace.to(recipientSocketId).emit('chat-private_message', {
                    message,
                    sender,
                    timestamp: new Date().toISOString()
                })
                callback?.({ success: true })
            } else {
                console.log(`User ${to} is not connected`)
                callback?.({ error: 'User is offline' })
            }
        } catch (error) {
            console.error('Error handling private message:', error)
            callback?.({ error: 'Failed to process message' })
        }
    })

    socket.on('disconnect', () => {
        // Remove user from connected users map
        for (const [userId, socketId] of connectedUsers.entries()) {
            if (socketId === socket.id) {
                connectedUsers.delete(userId)
                console.log(`User ${userId} disconnected`)
                break
            }
        }
    })
}

export default chatSocketHandler