import styles from './index.module.css'
export default function Paginate({
  activePage,
  productsTotal,
  productperPage,
  setActivePage,
}) {
  const totalPages = Math.ceil(productsTotal / productperPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== activePage) {
      setActivePage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (activePage > 2) {
      pageNumbers.push(1);
      if (activePage > 3) pageNumbers.push("...");
    }

    for (
      let i = Math.max(1, activePage - 1);
      i <= Math.min(totalPages, activePage + 1);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (activePage < totalPages - 1) {
      if (activePage < totalPages - 2) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) =>
      page === "..." ? (
        <li key={index} className="page-item disabled">
          <span className="page-link">…</span>
        </li>
      ) : (
        <li
          key={index}
          className={`page-item ${activePage === page ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        </li>
      )
    );
  };

  return (
    <div className="col-12 d-flex justify-content-center mt-4">
      <nav aria-label="Page navigation">
        <div className=" overflow-auto" id={styles.pagination_wrapper}>
          <ul className="pagination flex-nowrap">
            <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(activePage - 1)}
              >
                &laquo;
              </button>
            </li>

            {renderPageNumbers()}

            <li
              className={`page-item ${
                activePage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(activePage + 1)}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
