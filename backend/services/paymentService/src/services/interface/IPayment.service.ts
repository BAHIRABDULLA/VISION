import Stripe from 'stripe';

export interface IPaymentService {
    createSession(price: number, courseId: string, email: string): Promise<{ id?: string; success: boolean; message: string } | null>;
    constructWebhookEvent(payload: any, signature: string): Promise<Stripe.Event | null>;
    webhookHandleSave(event: Stripe.Event): Promise<null>;
}
