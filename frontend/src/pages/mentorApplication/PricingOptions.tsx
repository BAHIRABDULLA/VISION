import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { mentorOneTimePayment, mentorshipPayment, mentorSubscription } from '@/services/paymentApi';
import toast, { Toaster } from 'react-hot-toast';

type PlanType = 'subscription' | 'one-time' | null;

interface PricingOptionsProps {
    single: number | undefined;
    monthly: number | undefined
    mentorId: string
}

const PricingOptions: React.FC<PricingOptionsProps> = ({ single, monthly, mentorId }) => {
    console.log(mentorId, 'mentorid ');

    const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
    console.log(selectedPlan, 'selected plan')
    const menteeId = useSelector((state: RootState) => state.menteeAuth.user?.id)
    const publicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

    const stripePromise = loadStripe(publicKey)

    const handleBooking = async ()=>{
        const stripe = await stripePromise
        try {
            if(!selectedPlan){
                toast.error('Please choose a plan')
                return 
            }
            const data= {
                planType:selectedPlan,
                price: selectedPlan === 'subscription' ? monthly : single,
                menteeId,
                mentorId
            }
            const response = await mentorshipPayment(data)
            console.log(response,'response in handlebooking');
            
            if(response?.data.url){
                console.log(response.data.url,'response data url')
                window.location.href = response.data.url
            }else{
                // toast.error('Unable to process payment')
                toast.error(response?.data.message)

            }
        } catch (error) {
            console.error('Error founded in handlebooking',error);
            toast.error('Please sign in your account')

        }
    }
   

    return (
        <>
            <Toaster />
            <div className="bg-gray-700 border border-gray-500 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Pricing Plans</h3>

                {/* Monthly Subscription */}
                <div
                    className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all ${selectedPlan === 'subscription'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-500 hover:border-purple-400'
                        }`}
                    onClick={() => setSelectedPlan('subscription')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="text-white font-medium">Monthly Mentorship</h4>
                            <p className="text-sm text-gray-300">Recurring monthly access</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-white">₹{monthly}/mo</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                        <li className="flex items-center text-sm text-gray-200">
                            <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                            4 one-hour sessions per month
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                            <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                            Direct message access
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                            <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                            Code review support
                        </li>
                    </ul>
                </div>

                {/* One-time Session */}
                <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === 'one-time'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-purple-400'
                        }`}
                    onClick={() => setSelectedPlan('one-time')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h4 className="text-white font-medium">Single Session</h4>
                            <p className="text-sm text-gray-300">One-time payment</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-white">₹{single}</p>
                        </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                        <li className="flex items-center text-sm text-gray-200">
                            <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                            1 one-hour session
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                            <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                            Session recording
                        </li>
                        <li className="flex items-center text-sm text-gray-200">
                            <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                            Follow-up notes
                        </li>
                    </ul>
                </div>

                <button onClick={handleBooking}
                    className={`w-full mt-6 py-2 px-4 rounded-lg transition-colors ${selectedPlan
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!selectedPlan}
                >
                    {selectedPlan === 'subscription'
                        ? 'Start Monthly Mentorship'
                        : selectedPlan === 'one-time'
                            ? 'Book Single Session'
                            : 'Select a Plan'}
                </button>
            </div>
        </>

    );
};

export default PricingOptions;