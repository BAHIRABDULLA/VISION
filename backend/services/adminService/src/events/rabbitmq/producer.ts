const EXCHANGE_NAME = 'approval_status_exchange';
const EXCHANGE_TYPE = 'direct';
const ROUTING_KEY = 'approval_status'

import { connection, getChannel } from "../../config/rabbitmq"


export const publishMessage = async (data: object) => {
    try {
        const channel = getChannel()
        channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, {
            durable: false
        });
            channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(data)));
            console.log(`Sent: ${data}`);
        setTimeout(() => {
            connection.close()
        }, 500);

    } catch (error) {
        console.error('Error in publish message',error);
    } 
}