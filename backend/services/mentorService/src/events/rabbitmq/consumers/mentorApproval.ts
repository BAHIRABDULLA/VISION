import { getChannel } from "../../../config/rabbitmq";
import { mentorService } from "../../../config/container";

export const consumerMentorApprovalQueue = async()=>{
    try {  
        const channel = getChannel()
        const queue  = 'mentorApproval'
        
        await channel.assertQueue(queue,{durable:true})
        channel.consume(queue,async(msg)=>{
            console.log(msg,'msg in consumer mentor approval queue');
            if(msg!==null){
                const data = JSON.parse(msg.content.toString())
                console.log(data,'data , , , ');
                
                await mentorService.mentorApproval(data)
                channel.ack(msg)
                console.log('Listening to mentorApprovalQueue...');
            }
        })
    } catch (error) {
        console.error('Failed to consume consumerMentorApprovalQuue',error);
    }
}