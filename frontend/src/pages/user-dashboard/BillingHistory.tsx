import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { getUserBillingHistory } from '@/services/paymentApi';
import InvoiceDocument from '@/features/user/dashboard/InvoiceDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Loading from '@/components/Loading';

// type Payment = {
//     _id: string;
//     userEmail: string;
//     amount: number;
//     status: 'pending' | 'completed';
//     type: 'course_purchase' | 'mentorship_subscription' | 'one_time_payment';
//     courseId?: string;
//     menteeId: string;
//     mentorId?: string;
//     subscriptionPeriod?: string;
//     stripeSessionId?: string;
//     stripePaymentIntentId?: string;
//     invoiceCode?: string;
//     createdAt: string;
// };

const BillingHistory = () => {
    const [billingData, setBillingData] = useState<any>([]);

    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const fetchBillingHistory = async () => {
        try {
            const response = await getUserBillingHistory();
            console.log(response, 'response ');

            setBillingData(response?.data?.transaction || []);
        } catch (error) {
            console.error('Error fetching billing history:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBillingHistory();
    }, []);

    const toggleExpand = (_id: string) => {
        setExpandedId(expandedId === _id ? null : _id);
    };

    const toggleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedData = [...billingData].sort((a, b) => {
        const dateA = new Date(a._doc.createdAt).getTime();
        const dateB = new Date(b._doc.createdAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    if (loading) {
        return <Loading />
    }
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-center dark:text-white text-gray-800">Billing History</h2>
            <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={toggleSort}
                        className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-white bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                        Sort by Date
                        {sortOrder === 'desc' ? (
                            <ChevronDown className="ml-2 w-4 h-4" />
                        ) : (
                            <ChevronUp className="ml-2 w-4 h-4" />
                        )}
                    </button>
                </div>

                <div className="space-y-4">
                    {sortedData.map((payment) => (
                        <div key={payment?._doc?._id} className="border rounded-lg overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-500"
                                onClick={() => toggleExpand(payment?._doc?._id)}
                            >
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {new Date(payment?._doc?.createdAt).toISOString().split('T')[0]}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        {payment?._doc?.type === 'course_purchase'
                                            ? `Course Purchase`
                                            : payment?._doc?.type === 'mentorship_subscription'
                                                ? `Mentorship Payment`
                                                : `One-Time Payment`}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${payment?._doc?.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {payment?._doc.status.charAt(0).toUpperCase() + payment?._doc?.status.slice(1)}
                                    </span>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        ₹ {payment?._doc.amount}
                                    </span>
                                    <button
                                        className="p-2 text-gray-500 dark:text-white hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full"
                                    // onClick={(e) => {
                                    //     e.stopPropagation();
                                    //     handleDownload(payment?._doc?.invoiceCode);
                                    // }}
                                    >
                                        <PDFDownloadLink
                                            document={<InvoiceDocument invoice={payment?._doc} />}
                                            fileName={`invoice-${payment?._doc?.invoiceCode}.pdf`}
                                        >
                                            <Download className="w-5 h-5" />

                                        </PDFDownloadLink>
                                    </button>
                                </div>
                            </div>

                            {expandedId === payment?._doc?._id && (
                                <div className="border-t bg-gray-50 dark:bg-gray-500 p-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-white mb-2">
                                        Invoice Details
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <strong>User Email:</strong> {payment?._doc?.userEmail}
                                    </p>
                                    {payment?._doc?.type === 'course_purchase' && (
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <strong>Course ID:</strong> {payment?._doc?.courseId || 'N/A'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <strong>Course Name:</strong> {payment?.courseName || 'N/A'}
                                            </p>
                                        </div>

                                    )}
                                    {payment?._doc?.type === 'mentorship_subscription' && (
                                        <>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <strong>Mentor ID:</strong> {payment?._doc?.mentorId || 'N/A'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <strong>Subscription Period:</strong>{' '}
                                                {payment?._doc?.subscriptionPeriod || 'N/A'}
                                            </p>
                                        </>
                                    )}
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        <strong>Invoice Code:</strong> {payment?._doc?.invoiceCode || 'N/A'}
                                    </p>
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
