import express from 'express'
import { paymentController } from '../config/container'
import authenticateToken from '../middleware/auth.middleware'
import bodyParser from 'body-parser'
import adminAuthenticateToken from '../middleware/admin.auth.middleware'


const router = express.Router()

router.post('/create-checkout-session',authenticateToken,paymentController.createSessionForStripe.bind(paymentController))
// route.post('/webhook',express.raw({type:'application/json'}),paymentController.webhookHandle.bind(paymentController))
router.post('/mentorship-plan',authenticateToken,paymentController.mentorshipCheckoutSession.bind(paymentController))
router.get('/transactions',adminAuthenticateToken,paymentController.findTransactions.bind(paymentController))
router.get('/billing/history',authenticateToken,paymentController.getUserBillingHistory.bind(paymentController))
router.get('/course/:id',authenticateToken,paymentController.findCoursePayment.bind(paymentController))

export default router