import React from 'react';
import Header from './Header';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <Header />

            <div className="flex justify-center items-center ">
                <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white px-6 py-2 rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
