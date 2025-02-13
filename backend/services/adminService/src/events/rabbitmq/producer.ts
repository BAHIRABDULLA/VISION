const EXCHANGE_TYPE = 'fanout';

import { connection, getChannel } from "../../config/rabbitmq"


export const publishMessage = async (exchange: string, data: object) => {
    try {
        const channel = getChannel()
        channel.assertExchange(exchange, EXCHANGE_TYPE, {
            durable: false
        });
        channel.publish(exchange, '', Buffer.from(JSON.stringify(data)));
        console.log(`Sent: ${data}`);
        // setTimeout(() => {
        //     connection.close()
        // }, 500);

    } catch (error) {
        console.error('Error in publish message', error);
    }
}