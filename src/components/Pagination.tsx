interface PaginationProps{
    currentPage : number;
    totalPages : number;
    onPageChange : (num:number)=>void;
}

function Pagination({ currentPage, totalPages, onPageChange }:PaginationProps) {
    const pageNumbers : JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <a className="page-link" onClick={() => onPageChange(i)}>
                    {i}
                </a>
            </li>
        );
    }

    if(totalPages<1){
        return null;
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <a className="page-link" onClick={() => { currentPage > 1 && onPageChange(currentPage - 1) }} >
                        Previous
                    </a>
                </li>
                {pageNumbers}
                <li className="page-item">
                    <a className="page-link" onClick={() => { currentPage < totalPages && onPageChange(currentPage + 1) }}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;