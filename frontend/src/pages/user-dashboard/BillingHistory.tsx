import { getUserBillingHistory } from '@/services/paymentApi';
import { useState, useEffect } from 'react';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';



type userBillings = {
    status: boolean,
    type: 'course_purchase' | 'mentorship_subscription' | 'one_time_payment',
    amount: number,
    createAt: Date,
    mentorId?: string,
    menteeId: string,
    courseId?: string
}


const BillingHistory = () => {
    const [sortOrder, setSortOrder] = useState('desc');
    const [expandedId, setExpandedId] = useState(null);

    const [userBillings, setUserBillings] = useState<userBillings[]>([])

    console.log(userBillings, 'user billings  in billing history ');

    const fetchBillingHistory = async () => {
        try {
            const response = await getUserBillingHistory()
            console.log(response, 'response in fetch billing history ');
            setUserBillings(response.data?.transaction)
        } catch (error) {
            console.error('Error founded in fetch billing history ', error);
        }
    }

    useEffect(() => {
        fetchBillingHistory()
    }, [])


    const billingData = [
        {
            id: 1,
            date: '2024-01-20',
            amount: 199.99,
            status: 'Paid',
            invoice: 'INV-2024-001',
            items: [
                { name: 'Premium Plan', price: 149.99 },
                { name: 'Additional Users (5)', price: 50.00 }
            ]
        },
        {
            id: 2,
            date: '2023-12-20',
            amount: 149.99,
            status: 'Paid',
            invoice: 'INV-2023-012',
            items: [
                { name: 'Premium Plan', price: 149.99 }
            ]
        },
        {
            id: 3,
            date: '2023-11-20',
            amount: 149.99,
            status: 'Paid',
            invoice: 'INV-2023-011',
            items: [
                { name: 'Premium Plan', price: 149.99 }
            ]
        }
    ];

    const toggleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const sortedBillingData = [...billingData].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl text-center font-bold dark:text-white text-gray-800">Billing History</h2>
            <div className='w-full max-w-4xl mt-8 mx-auto p-6 bg-gray-300 dark:bg-gray-600 rounded-lg shadow'>
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={toggleSort}
                        className="flex items-center px-4 py-2 text-sm dark:text-white text-gray-600 dark:hover:bg-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Sort by Date
                        {sortOrder === 'desc' ?
                            <ChevronDown className="ml-2 w-4 h-4" /> :
                            <ChevronUp className="ml-2 w-4 h-4" />
                        }
                    </button>
                </div>

                <div className="space-y-4">
                    {sortedBillingData.map((bill) => (
                        <div key={bill.id} className="border rounded-lg overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-500"
                                onClick={() => toggleExpand(bill.id)}
                            >
                                <div className="flex-1">
                                    <p className="font-medium dark:text-white text-gray-900">{formatDate(bill.date)}</p>
                                    <p className="text-sm   dark:text-white text-gray-500">Invoice: {bill.invoice}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-sm
                  ${bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {bill.status}
                                    </span>
                                    <span className="font-medium dark:text-white text-gray-900">{formatCurrency(bill.amount)}</span>
                                    <button
                                        className="p-2 dark:text-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Download logic would go here
                                        }}
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {expandedId === bill.id && (
                                <div className="border-t bg-gray-50 dark:bg-gray-500 p-4">
                                    <h4 className="text-sm font-medium dark:text-white text-gray-700 mb-2">Invoice Details</h4>
                                    <div className="space-y-2">
                                        {bill.items.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="dark:text-white  text-gray-600">{item.name}</span>
                                                <span className="dark:text-white  text-gray-900">{formatCurrency(item.price)}</span>
                                            </div>
                                        ))}
                                        <div className="pt-2 border-t flex justify-between font-medium">
                                            <span className="dark:text-white text-gray-900">Total</span>
                                            <span className="dark:text-white text-gray-900">{formatCurrency(bill.amount)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default BillingHistory;