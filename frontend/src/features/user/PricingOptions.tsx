import React, { useState } from 'react';
import { Check } from 'lucide-react';
type PlanType = 'subscription' | 'one-time' | null;

const PricingOptions = () => {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pricing Plans</h3>
            
            {/* Monthly Subscription */}
            <div 
                className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                    selectedPlan === 'subscription' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-gray-700 hover:border-purple-400'
                }`}
                onClick={() => setSelectedPlan('subscription')}
            >
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-white font-medium">Monthly Mentorship</h4>
                        <p className="text-sm text-gray-400">Recurring monthly access</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-white">$299/mo</p>
                    </div>
                </div>
                <ul className="space-y-2 mt-4">
                    <li className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        4 one-hour sessions per month
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        Direct message access
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        Code review support
                    </li>
                </ul>
            </div>

            {/* One-time Session */}
            <div 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === 'one-time' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-gray-700 hover:border-purple-400'
                }`}
                onClick={() => setSelectedPlan('one-time')}
            >
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-white font-medium">Single Session</h4>
                        <p className="text-sm text-gray-400">One-time payment</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-white">$99</p>
                    </div>
                </div>
                <ul className="space-y-2 mt-4">
                    <li className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        1 one-hour session
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        Session recording
                    </li>
                    <li className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        Follow-up notes
                    </li>
                </ul>
            </div>

            <button
                className={`w-full mt-6 py-2 px-4 rounded-lg transition-colors ${
                    selectedPlan 
                        ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
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
    );
};

export default PricingOptions;