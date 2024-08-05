
type PaginationProps = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1}
                className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            {Array.from({ length: pages }, (_, index) => (
                <button 
                    key={index} 
                    onClick={() => handlePageChange(index + 1)} 
                    className={`px-3 py-1 mx-1 ${page === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page === pages}
                className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
