import { getChannel } from "../../../config/rabbitmq";
import IUser from "../../../interfaces/IUser";

export const sendUserData = async(exchange:string,data:Partial<IUser>)=>{
    try {
        console.log();
        
        const channel = getChannel()
        await channel.assertExchange(exchange,'fanout',{durable:true})
        channel.publish(exchange,'',Buffer.from(JSON.stringify(data)))
        console.log('user data sent to exchange:',data);
    } catch (error) {
        console.error('Failed to send user data',error);
    }
}
