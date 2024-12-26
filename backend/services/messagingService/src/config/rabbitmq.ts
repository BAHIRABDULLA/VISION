import amqplib,{Connection,Channel} from 'amqplib'

let connection:Connection
let channel:Channel


export const rabbitmqConnect = async () => {
    while (true) {
        try {
           
            connection = await amqplib.connect('amqp://localhost:5672');
            channel = await connection.createChannel();
            console.log('Connected to RabbitMQ in messagingservice');
            break;
        } catch (error) {
            console.error('Failed to connect to RabbitMQ in messagingservice', error);
            console.log('Retrying connection in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000)); 
        }
    }
};

export const getChannel = (): Channel => channel;