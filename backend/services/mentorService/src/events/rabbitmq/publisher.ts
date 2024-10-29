import { getChannel } from "../../config/rabbitmq";

export const sendMentorData = async(mentorData:any,profile?:string)=>{
    try {
        const channel = getChannel()
        const queue = 'mentorData'
        await channel.assertQueue(queue,{durable:true})
        const payload = {
            ...mentorData,
            profile
        }
        channel.sendToQueue(queue,Buffer.from(JSON.stringify(payload)))
        console.log('Mentor data sent to queue:',mentorData);
    } catch (error) {
        console.error('Failed to send mentor data',error);
    }
}