// import { getChannel } from "../../config/rabbitmq";


// export const consumerMentorQueue = async()=>{
//     try {  
//         const channel = getChannel()
//         const queue  = 'mentorQueue'
//         console.log(queue,'queue in counsumer mentor queue ');
        
//         await channel.assertQueue(queue,{durable:true})
//         channel.consume(queue,async(msg)=>{
//             console.log(msg,'msg in consumer mentor queue');
//             if(msg!==null){
//                 const mentorData = JSON.parse(msg.content.toString())
//                 console.log(mentorData,'mentorData , , , ');
                
//                 await adminService.registerUser(mentorData)
//                 channel.ack(msg)
//                 console.log('Listening to mentorQueue...');
//             }
//         })
//     } catch (error) {
//         console.error('Failed to consume consumerMentorQuue',error);
//     }
// }