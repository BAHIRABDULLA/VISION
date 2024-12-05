import Stripe from 'stripe';
import { mentorshipPaymentData } from '../implementation/payment.service';
import { IPayment } from '../../models/payment.model';

export interface IPaymentService {
    createSession(price: number, courseId: string, email: string ,menteeId:string): Promise<{ id?: string; success: boolean; message: string } | null>;
    webhookHandleSave(event: Stripe.Event): Promise<null>;


    commonSession(userEmail:string,planType:string,menteeId:string,mentorId:string,sessionPrice:number):Promise<any>

    findCoursePayment(courseId:string,menteeId:string):Promise<IPayment | null>
}
