import { getChannel } from "../../../config/rabbitmq";
import { mentorService } from "../../../config/container";

const EXCHANGE_NAME = 'category_exchange';


export const receiveCategoryMessage = async (queue:string) => {
    try {
        const channel = getChannel()
        channel.assertExchange(EXCHANGE_NAME, "fanout", {
            durable: false,
          });
      
           await channel.assertQueue(queue, { exclusive: true });
      
          console.log(`Waiting for messages in queue: ${queue}`);
      
          channel.bindQueue(queue, EXCHANGE_NAME, "");
      
          channel.consume(
            queue,async(msg) => {
              if (msg !== null) {
                const message = msg.content.toString();
                console.log(`Received: ${message}`);
                await mentorService.addCategory(JSON.parse(message))
                channel.ack(msg); 
              }
            },
            { noAck: false } 
          );

    } catch (error) {
        console.error('Failed to consume consumerMentorApprovalQuue', error);
    }
}