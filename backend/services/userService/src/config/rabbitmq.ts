import amqplib,{Connection,Channel} from 'amqplib'

let connection:Connection
let channel:Channel


export const rabbitmqConnect = async () => {
    while (true) {
        try {
           
            connection = await amqplib.connect('amqp://rabbitmq:5672');
            channel = await connection.createChannel();
            console.log('Connected to RabbitMQ in userService');
            break;
        } catch (error) {
            console.error('Failed to connect to RabbitMQ', error);
            console.log('Retrying connection in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000)); 
        }
    }
};

export const getChannel = (): Channel => channel;