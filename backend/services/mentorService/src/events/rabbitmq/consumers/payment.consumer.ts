import { getChannel } from "../../../config/rabbitmq"
import { paymentService } from "../../../config/container"

export const receiveMessage = async () => {
    try {
        const channel = getChannel()
        if (!channel) {
            console.error("RabbitMQ channel is not available");
            return;
        }
        const exchange = 'logs_fanout'
        await channel.assertExchange(exchange, 'fanout', { durable: true })

        const { queue } = await channel.assertQueue('', { exclusive: false })
        await channel.bindQueue(queue, exchange, '')
        console.log('Waiting for messages in mentor service');
        channel.consume(queue, async (msg) => {
            if (msg) {
                console.log(`message recieive payment service ${msg.content.toString()}`);
                await paymentService.savePaymentData(JSON.parse(msg.content.toString()))
                channel.ack(msg);
            }
        }, { noAck: false })

    } catch (error) {
        console.error('Error founded in recieve message in payment service', error);
    }
}

