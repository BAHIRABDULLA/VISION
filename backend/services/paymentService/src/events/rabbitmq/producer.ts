import { connection, getChannel } from "../../config/rabbitmq"


export const publishMessage = async (data: object, exchangeName: string = 'logs_fanout') => {
    try {
        const channel =  getChannel()
        await channel.assertExchange(exchangeName, 'fanout', { durable: true })
        const message = JSON.stringify(data)
        channel.publish(exchangeName, "", Buffer.from(message))
        console.log(`Message sent ${message}`);

    } catch (error) {
        console.error('Error in publish message',error);
    } 
}