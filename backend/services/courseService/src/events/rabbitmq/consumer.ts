import { getChannel } from "../../config/rabbitmq";


export async function receiveMessage(){
    try {
        const channel =  getChannel()

        const exchange = 'logs_fanout'
        await channel.assertExchange(exchange,'fanout',{durable:false})

        const {queue}  = await channel.assertQueue('',{exclusive:true})
        await channel.bindQueue(queue,exchange,'')
        console.log('Waiting for messages in course service');
        channel.consume(queue,(msg)=>{
            if(msg){
                console.log(`message recieive course service ${msg.content.toString()}`);
            }
        },{noAck:true})
        
    } catch (error) {
        console.error('Error founded in recieve message in courser service',error);
    }
}

// receiveMessage()