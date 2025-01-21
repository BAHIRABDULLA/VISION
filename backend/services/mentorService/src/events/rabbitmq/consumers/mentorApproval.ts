import { getChannel } from "../../../config/rabbitmq";
import { mentorService } from "../../../config/container";

const EXCHANGE_NAME = 'mentorApproval';
const EXCHANGE_TYPE = 'fanout';
const QUEUE_NAME = 'mentor_service_queue';

export const consumerMentorApprovalQueue = async () => {
    try {
        const channel = getChannel()
        const queue = QUEUE_NAME
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });

        await channel.assertQueue(queue, { durable: true })
        await channel.bindQueue(queue,EXCHANGE_NAME,"")
        channel.consume(queue, async (msg) => {
            console.log(msg, 'msg in consumer mentor approval queue');
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString())

                await mentorService.mentorApproval(data)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorApprovalQuue', error);
    }
}