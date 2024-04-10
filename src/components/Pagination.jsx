import PropTypes from 'prop-types';
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <a className="page-link" onClick={() => onPageChange(i)}>
                    {i}
                </a>
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" onClick={() => { currentPage > 1 && onPageChange(currentPage - 1)} } >
                        Previous
                    </a>
                </li>
                {pageNumbers}
                <li className="page-item">
                    <a className="page-link" onClick={() => { currentPage < totalPages && onPageChange(currentPage + 1)}}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}