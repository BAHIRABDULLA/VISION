import { IPaymentService } from "../services/interface/IPayment.service";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Stripe from "stripe";
import { successResponse } from "../utils/response.helper";
import { HttpStatus } from "../enums/http.status";
import CustomError from "../utils/custom.error";


let stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-09-30.acacia' })

interface CustomeRequest extends Request {
    user?: string | JwtPayload,

}
export class PaymentController {

    private paymentService: IPaymentService
    constructor(paymentService: IPaymentService) {
        this.paymentService = paymentService
    }

    async createSessionForStripe(req: CustomeRequest, res: Response , next : NextFunction) {
        try {

            const user = req.user as JwtPayload

            const userEmail = user.email
            const menteeId = user.id 
            const { price, courseId } = req.body
            const response = await this.paymentService.createSession(price, courseId, userEmail,menteeId)
            res.json(response)
        } catch (error) {
            console.error('ERror founded in create session in contro paymenservice', error);
            next(error)
        }
    }

    async webhookHandle(req: Request, res: Response ) {
        console.log('its here webhook handler');
        let event
        const sig = req.headers['stripe-signature'] as string;
        if (!sig) {
            return res.status(400).send('Webhook Error: Missing signature or secret');
        }

        try {
           
            // const event = await this.paymentService.constructWebhookEvent(req.body, sig);
            
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SIGNIN_SECRET!);
            if (event) {
                await this.paymentService.webhookHandleSave(event);
                res.json({ received: true });
            } else {
                return res.status(400).send('Webhook Error: Event verification failed');
            }
        } catch (error) {
            console.error('Error in webhook signature verification:', error);
            // return res.status(400).send(`Webhook Error: ${error.message}`);
        }
    }


    async mentorshipCheckoutSession(req:CustomeRequest,res:Response ,next:NextFunction){
        try {
            const user = req.user as JwtPayload
            if(!user){
                throw new CustomError("Please sign in",HttpStatus.BAD_REQUEST)
            }
            const userEmail = user.email
            const {planType,price,menteeId,mentorId}  = req.body            
            const response = await this.paymentService.commonSession(userEmail,planType,menteeId,mentorId,price)
            return res.status(200).json(response)
        } catch (error) {
            console.error('Error founded in common checkout session',error);
            next(error)
        }
    }

    async findCoursePayment(req:CustomeRequest,res:Response , next:NextFunction){
        try {
            const user = req.user as JwtPayload
            const {id} = req.params
            const response = await this.paymentService.findCoursePayment(id,user.id)
            return successResponse(res,HttpStatus.OK,"Founded course",response)
        } catch (error) {
            console.error('Error founded in find course payment',error);
            next(error)
        }
    }

    async findTransactions(req:Request,res:Response , next:NextFunction){
        try {
            
            const response = await this.paymentService.findAllTransactions()
            return successResponse(res,HttpStatus.OK,"Founded transactions",{transactions:response})
        } catch (error) {
            console.error('Error founded in find transactions',error);
            next(error)
        }
    }

}