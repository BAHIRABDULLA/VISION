import React from 'react'

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void
}


const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }
    return (
        <div className='flex items-center justify-center gap-2 p-4'>
            <button className={`px3 py-1 border rounded 
            ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'} `}
                onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1}
                    className={`px-3 py-1 text-white border rounded  hover:text-black
                ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 '}`}
                    onClick={() => handlePageClick(index + 1)}>
                    {index + 1}
                </button>
            ))}

            <button className={`px-3 py-1  border rounded
                ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination