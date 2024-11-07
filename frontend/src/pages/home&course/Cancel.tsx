import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const Cancel = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <div className="text-center">
          <XCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Payment Canceled</h1>
          <p className="text-gray-600 mb-6">
            You have canceled the payment. If this was a mistake, please try again.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
            onClick={handleGoHome}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;