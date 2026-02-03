import { ChevronsRight,ChevronRight,ChevronLeft,ChevronsLeft } from "lucide-react";
import './pagination.css'
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`page-btn ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(<span key={i} className="dots">...</span>);
      }
    }
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Страница <b>{currentPage}</b> из <b>{totalPages}</b>
      </div>
      <div className="pagination-controls">
        <button onClick={() => onPageChange(1)} disabled={!canGoBack} className="page-btn">
          <ChevronsLeft size={18} />
        </button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={!canGoBack} className="page-btn">
          <ChevronLeft size={18} />
        </button>
        
        {renderPageNumbers()}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={!canGoForward} className="page-btn">
          <ChevronRight size={18} />
        </button>
        <button onClick={() => onPageChange(totalPages)} disabled={!canGoForward} className="page-btn">
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;