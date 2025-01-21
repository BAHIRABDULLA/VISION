// src/events/rabbitmq/consumers/consumer.ts


import { getChannel } from "../../../config/rabbitmq";
import { UserService } from "../../../services/implementation/user.service";
import { AuthService } from "../../../services/implementation/auth.service";

// export const userService = new UserService()
// export const authService = new AuthService()


export const consumerMentorQueue = async (userService:UserService,authService:AuthService) => {
    try {
        const channel = getChannel()
        const queue = 'mentorData'

        await channel.assertQueue(queue, { durable: true })
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const payload = JSON.parse(msg.content.toString())
                console.log(msg, 'msg in userService events');                
                
                await userService.uploadMentorData(payload)
                await authService.updateFormFieldAndPhoto(payload.mentor, payload.profile)
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorQuue', error);
    }
}