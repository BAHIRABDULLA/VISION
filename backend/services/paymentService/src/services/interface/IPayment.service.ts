import Stripe from 'stripe';
import { IPayment } from '../../interfaces/IPayment';

export interface IPaymentService {
    createSession(price: number, courseId: string, email: string, menteeId: string): Promise<{ id?: string; success: boolean; message: string } | null>;
    webhookHandleSave(event: Stripe.Event): Promise<null>;
    commonSession(userEmail: string, planType: string, menteeId: string, mentorId: string, sessionPrice: number): Promise<{ url: string | null; } | undefined>
    findCoursePayment(courseId: string, menteeId: string): Promise<IPayment | null>
    findAllTransactions(): Promise<IPayment[] | null>
}
