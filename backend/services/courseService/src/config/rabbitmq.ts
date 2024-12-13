import amqplib,{Connection,Channel} from 'amqplib'

export let connection:Connection
let channel:Channel


export const rabbitmqConnect = async()=>{
    try {
        connection = await amqplib.connect('amqp://localhost')
        channel = await connection.createChannel()
        console.log('connected to rabbtimq in courseService');
        
    } catch (error) {
        console.error('Failed to connect to rabbitmq',error);
    }
}


export const getChannel = (): Channel => channel;