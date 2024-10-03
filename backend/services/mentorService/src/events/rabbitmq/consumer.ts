import { getChannel } from "../../config/rabbitmq";
import { mentorService } from "../../services/mentorService";

export const consumerMentorQueue = async()=>{
    try {
        console.log('its here consumerMentor queue ');
        
        const channel = getChannel()
        const queue  = 'mentorQueue'
        console.log(queue,'queue in counsumer mentor queue ');
        console.log(channel,'channer in consumer ');
        
        await channel.assertQueue(queue,{durable:true})
        channel.consume(queue,async(msg)=>{
            console.log(msg,'msg in consumer mentor queue');
            
            if(msg!==null){
                const mentorData = JSON.parse(msg.content.toString())
                await mentorService.registerMentor(mentorData)
                channel.ack(msg)
                console.log('Listening to mentorQueue...');
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorQuue',error);
    }
}