
import stripe from "stripe";
import Payment, { IPayment } from "../../models/payment.model";
import { IPaymentService } from "../interface/IPayment.service";
import Stripe from "stripe";
import { PaymentRepository } from "../../repositories/implementations/payment.repository";

export class PaymentService implements IPaymentService {
    private stripe: Stripe
    private paymentRepository: PaymentRepository
    constructor(paymentRepository: PaymentRepository) {
        // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-09-30.acacia' })
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        this.paymentRepository = paymentRepository
    }

    async createSession(price: number, courseId: string, email: string): Promise<{ id?: string; success: boolean; message: string } | null> {
        try {
            // const stripeSecretKey = process.env.STRIPE_SECRET_KEY
            // if (!stripeSecretKey) {
            //     return { success: false, message: "Not founded secret key " }
            // }
            // const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-09-30.acacia' })
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer_email: email,
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Course: ${courseId}`,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1
                }],
                mode: 'payment',
                metadata: { courseId },
                success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'http://localhost:5173/cancel',
            })
            return { success: true, message: "payment session created", id: session.id }
        } catch (error) {
            console.error('Error founded in create session', error);
            return { success: false, message: 'internal server error' }
        }
    }

    constructWebhookEvent(payload: any, signature: string): Promise<Stripe.Event | null> {
        return new Promise((resolve, reject) => {
            try {
                console.log(payload.toString(), '- - - pay load - - -', signature, '- - -  signature - - - -');
                console.log(process.env.STRIPE_WEBHOOK_SIGNIN_SECRET, 'env.STRIPE_WEBHOOK_SIGNIN_SECRET');
                const event = this.stripe.webhooks.constructEvent(payload.toString(), signature, process.env.STRIPE_WEBHOOK_SIGNIN_SECRET!);
                resolve(event);
            } catch (error) {
                console.error('Error constructing webhook event:', error);
                reject(null);
            }
        });
    }

    async webhookHandleSave(event: Stripe.Event): Promise<null> {
        try {
            console.log('its here in web hook handle save');

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object as Stripe.Checkout.Session;
                const userEmail = session.customer_email;
                const courseId = session.metadata?.courseId;
                const amount = session.amount_total;
                if (!userEmail || !courseId || amount == null) {
                    throw new Error("Missing required payment data");
                }
                
                const paymentData: Partial<IPayment> = {
                    userEmail,
                    courseId,
                    amount,
                    type: 'course_purchase',
                    status: 'completed',
                    // sessionId: session.id,
                };

                const response = await this.paymentRepository.create(paymentData)
                console.log('Payment data saved successfully:', response);

            }
            return null
        } catch (error) {
            console.error('Error founded in webhoook handler');
            return null
        }
    }

}