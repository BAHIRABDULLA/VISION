import React, { useEffect } from 'react';
import { Card,  CardContent} from '@mui/material';
import { getAllTransaction } from '@/services/paymentApi';

const Transaction = () => {

    const [transactions, setTransactions] = React.useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getAllTransaction()
                setTransactions(response.data.transactions);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTransactions();
    }
        , []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'course_purchase':
                return '📚';
            case 'mentorship_subscription':
                return '👥';
            default:
                return '💰';
        }
    };

    return (
        <>
            <h2 className='text-2xl text-black mb-6'>Transaction History</h2>
            <Card className="w-full max-w-6xl">
                {/* <CardHeader> */}
                {/* </CardHeader> */}
                <CardContent>
                    <div className="space-y-4">
                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-2xl">
                                        {getTypeIcon(transaction.type)}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">
                                            {transaction.name}
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <span className="inline-block mt-1 capitalize text-sm font-medium">
                                            {transaction.type === 'course_purchase' ? 'Course' : transaction.type === 'mentorship_subscription' ? 'Mentorship' : 'One-time Payment'}
                                        </span>
                                    </div>
                                    <div>
                                        {transaction.type === 'course_purchase' ?
                                            <div>
                                                <h2>User Id</h2>
                                                <p className="text-sm text-gray-500">{transaction.menteeId}</p>
                                            </div>
                                            : <div>
                                                <h2>Mentor Id</h2>
                                                <p className="text-sm text-gray-500">{transaction.mentorId}</p>
                                                <h2>User Id</h2>
                                                <p className="text-sm text-gray-500">{transaction.menteeId}</p>
                                            </div>}
                                    </div>

                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <div className="font-medium text-gray-900">
                                            ₹ {transaction.amount.toFixed(2)}
                                        </div>
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(
                                                transaction.status
                                            )}`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Transaction;