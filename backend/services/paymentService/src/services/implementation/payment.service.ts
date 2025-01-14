
import stripe from "stripe";
import Payment, { IPayment } from "../../models/payment.model";
import { IPaymentService } from "../interface/IPayment.service";
import Stripe from "stripe";
import { PaymentRepository } from "../../repositories/implementations/payment.repository";
import CustomError from "../../utils/custom.error";
import { HttpStatus } from "../../enums/http.status";
import { publishMessage } from "../../events/rabbitmq/producer";

export interface mentorshipPaymentData {

    price: number
    menteeId: string
    mentorId: string
}


export class PaymentService implements IPaymentService {
    private stripe: Stripe
    private paymentRepository: PaymentRepository
    constructor(paymentRepository: PaymentRepository) {
        // this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-09-30.acacia' })
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        this.paymentRepository = paymentRepository
    }

    async createSession(price: number, courseId: string, email: string, menteeId: string): Promise<{ id?: string; success: boolean; message: string } | null> {
        try {
            const findUserBuyCourse = await this.paymentRepository.findOne({ courseId, menteeId })
            console.log(findUserBuyCourse, 'findUserBuyCourse');
            if (findUserBuyCourse) {
                throw new CustomError("Course already purchased", HttpStatus.UNAUTHORIZED)
            }


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
                success_url: `https://vision.bahirabdulla.online/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'https://vision.bahirabdulla.online/cancel',
            })
            const paymentData: Partial<IPayment> = {
                userEmail: email,
                courseId,
                amount: price,
                menteeId,
                type: 'course_purchase',
                status: 'pending',
                stripeSessionId: session.id
            };
            const response = await this.paymentRepository.create(paymentData)
            console.log(response, 'response in create session ');

            return { success: true, message: "payment session created", id: session.id }
        } catch (error) {
            console.error('Error founded in create session', error);
            throw error
        }
    }



    async webhookHandleSave(event: Stripe.Event): Promise<null> {
        try {
            console.log('its here in web hook handle save');

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object as Stripe.Checkout.Session;

                const response=await this.paymentRepository.findOneAndUpdate({ stripeSessionId: session.id },
                    {
                        status: 'completed',
                        stripePaymentIntentId: session.payment_intent as string
                    }
                )
                console.log(response,'response after completing saving data')
                if(response?.isModified){
                    await publishMessage(response)
                }
                
            }
            return null
        } catch (error) {
            console.error('Error founded in webhoook handler');
            return null
        }
    }



    async commonSession(userEmail: string, planType: string, menteeId: string, mentorId: string, sessionPrice: number) {
        console.log(planType, 'plan type', menteeId, 'menteeId', mentorId, 'mentorId', sessionPrice, 'sessioprice');

        try {
            const findUserBoughtMentorship = await this.paymentRepository.findUserBoughtSession(menteeId)
            console.log(findUserBoughtMentorship, 'find user bought mentorship');
            if (findUserBoughtMentorship?.status ==='completed') {
                throw new CustomError(`${findUserBoughtMentorship.type} session already purchased`, HttpStatus.UNAUTHORIZED)
            }
            if(findUserBoughtMentorship?.status==='pending'){
                await this.paymentRepository.delete(findUserBoughtMentorship.id)
            }
            if (planType === 'one-time') {
                const session = await this.stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items: [
                        {
                            price_data: {
                                currency: 'inr',
                                product_data: {
                                    name: "Single Mentorship Session",
                                    description: '1-hour session with follow-up notes and recording'
                                },
                                unit_amount: sessionPrice * 100
                            },
                            quantity: 1
                        }
                    ],
                    success_url: `https://vision.bahirabdulla.online/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: 'https://vision.bahirabdulla.online/cancel',
                })
                const data: Partial<IPayment> = {
                    userEmail,
                    amount: sessionPrice,
                    status: 'pending',
                    type: 'one_time_payment',
                    menteeId,
                    mentorId,
                    stripeSessionId: session.id
                }

                const newPayment = await this.paymentRepository.create(data)
                console.log(newPayment, 'new payment in single payment session');


                return { url: session.url }
            } else if (planType === 'subscription') {
                const product = await this.stripe.products.create({
                    name: "Monthly Mentorship Subscription",
                    description: '4 session per month and code reviews'
                })
                const price = await this.stripe.prices.create({
                    currency: 'inr',
                    unit_amount: sessionPrice * 100,
                    recurring: { interval: 'month' },
                    product: product.id
                })
                const session = await this.stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'subscription',
                    line_items: [{ price: price.id, quantity: 1 }],
                    success_url: `https://vision.bahirabdulla.online/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: 'https://vision.bahirabdulla.online/cancel',
                })

                const data: Partial<IPayment> = {
                    userEmail,
                    amount: sessionPrice,
                    status: 'pending',
                    type: 'mentorship_subscription',
                    menteeId,
                    mentorId,
                    stripeSessionId: session.id
                }

                const newPayment = await this.paymentRepository.create(data)
                console.log(newPayment, 'new payment in monthly payment session');


                return { url: session.url }
            }
        } catch (error) {
            console.error('Error founded in commmon session', error);
            throw error
        }
    }


    async findCoursePayment(courseId: string, menteeId: string) {
        try {
            const findCourse = await this.paymentRepository.findIsUserBoughtCourse(courseId, menteeId)
            console.log(findCourse,'find course');
            
            if (!findCourse) {
                throw new CustomError('Course not founded',HttpStatus.NOTFOUND)
            }
            return findCourse
        } catch (error) {
            console.error('Error founded in find course payment', error);
            throw error
        }
    }

    async findAllTransactions() {
        try {
            const allTransactions = await this.paymentRepository.findAll()
            return allTransactions
        } catch (error) {
            console.error('Error founded in find all transactions', error);
            throw error
        }
    }

}



