import { connection, getChannel } from "../../config/rabbitmq"


export const publishMessage = async (data: object, exchangeName: string = 'logs_fanoutt') => {
    try {
        const channel =  getChannel()
        await channel.assertExchange(exchangeName, 'fanout', { durable: false })
        const message = JSON.stringify(data)
        channel.publish(exchangeName, "", Buffer.from(message))
        console.log(`Message sent ${message}`);

        setTimeout(() => {
            connection.close()
        }, 500);

    } catch (error) {
        console.error('Error in publish message',error);
    } 
}