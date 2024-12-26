import { getChannel } from "../../../config/rabbitmq";
import { mentorService } from "../../../config/container";

// const mentorService=  new MentorService()
export const consumerMentorQueue = async (exchange:string,queue:string) => {
    try {
        const channel = getChannel()
        await channel.assertExchange(exchange,'fanout',{durable:true})
        // const queue = 'userQueue'
        console.log(queue, 'queue in counsumer mentor queue ');

        await channel.assertQueue(queue, { durable: true })
        await channel.bindQueue(queue,exchange,'')
        channel.consume(queue, async (msg) => {
            console.log(msg, 'msg in consumer mentor queue');
            if (msg !== null) {
                const userData = JSON.parse(msg.content.toString())
                console.log(userData, 'userData , , , ');
                if(userData.role==='mentor'){
                    await mentorService.registerMentor(userData)
                }else{
                    console.log('User is not a mentor ; no action needed ');
                }
                channel.ack(msg)
                console.log('Listening to mentorQueue...');
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorQuue', error);
    }
}
consumerMentorQueue('userExchange','mentorQueue')