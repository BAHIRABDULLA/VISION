import { paymentService } from "../../config/injection";
import { getChannel } from "../../config/rabbitmq";


export async function receiveMessage() {
    try {
        const channel = getChannel()

        const exchange = 'logs_fanout'
        await channel.assertExchange(exchange, 'fanout', { durable: true })

        const { queue } = await channel.assertQueue('', { exclusive: false })
        await channel.bindQueue(queue, exchange, '')
        console.log('Waiting for messages in course service');
        channel.consume(queue, async (msg) => {
            if (msg) {
                console.log(`message recieive course service ${msg.content.toString()}`);
                await paymentService.savePaymentData(JSON.parse(msg.content.toString()))
                channel.ack(msg);
            }
        }, { noAck: false })

    } catch (error) {
        console.error('Error founded in recieve message in courser service', error);
    }
}

// receiveMessage()