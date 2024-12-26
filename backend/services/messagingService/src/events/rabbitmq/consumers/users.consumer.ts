import { userService } from "../../../config/container";
import { getChannel } from "../../../config/rabbitmq";

export const setupConsumer = async (exchange:string,queue:string) => {
    try {
        const channel = getChannel()
        await channel.assertExchange(exchange,'fanout',{durable:true})
        

        await channel.assertQueue(queue, { durable: true })
        await channel.bindQueue(queue,exchange,'')
        channel.consume(queue, async (msg) => {
            console.log(msg, 'msg in consumer messaging ====== queue');
            if (msg !== null) {
                const userData = JSON.parse(msg.content.toString())
                console.log(userData, 'userData , , , ');
                userService.saveUserData(userData)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorQuue', error);
    }
}

// setupConsumer('userExchange','messagingQueue')