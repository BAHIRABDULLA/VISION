import { getChannel } from "../../../config/rabbitmq";

export const sendMentorData = async(queue:string,mentorData:any)=>{
    try {
        const channel = getChannel()
        await channel.assertQueue(queue,{durable:true})
        channel.sendToQueue(queue,Buffer.from(JSON.stringify(mentorData)))
        console.log('Mentor data sent to queue:',mentorData);
    } catch (error) {
        console.error('Failed to send mentor data',error);
    }
}
