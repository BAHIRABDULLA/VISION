import { getChannel } from "../../../config/rabbitmq";
import { mentorService } from "../../../config/container";

// const mentorService=  new MentorService()
export const consumerMentorQueue = async (exchange: string, queue: string) => {
    try {
        const channel = getChannel()
        await channel.assertExchange(exchange, 'fanout', { durable: true })

        await channel.assertQueue(queue, { durable: true })
        await channel.bindQueue(queue, exchange, '')
        channel.consume(queue, async (msg) => {
            console.log(msg, 'msg in consumer mentor queue');
            if (msg !== null) {
                const userData = JSON.parse(msg.content.toString())
                await mentorService.registerUser(userData)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorQuue', error);
    }
}
consumerMentorQueue('userExchange', 'mentorQueue')