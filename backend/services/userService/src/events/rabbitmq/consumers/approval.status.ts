import { getChannel } from "../../../config/rabbitmq";
import { UserService } from "../../../services/implementation/user.service";
const EXCHANGE_NAME = 'approval_status_exchange';
const EXCHANGE_TYPE = 'direct';
const QUEUE_NAME = 'user_service_queue';
const ROUTING_KEY = 'approval_status';
export const consumeApprovalStatus = async (userService:UserService) => {
    try {
        const channel = getChannel()
        await channel.assertExchange(EXCHANGE_NAME,EXCHANGE_TYPE, { durable: false });
        await channel.assertQueue(QUEUE_NAME, { durable: false });
        await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
        channel.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                const payload = JSON.parse(msg.content.toString())
                console.log(payload, 'payload in approval consumer in userservice');
                await userService.updateUserApproval(payload)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorQuue', error);
    }
}