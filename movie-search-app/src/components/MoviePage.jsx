function MoviePage({ currentPage, setCurrentPage, totalPages, gotoPage, setGotoPage, handleGoToPage }) {
    return (
        <>
        {totalPages > 1 && (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>

    <span style={{ margin: '0 12px' }}>
      Page {currentPage} / {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
     <form
                onSubmit={handleGoToPage}
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={gotoPage}
                  onChange={(e) => setGotoPage(e.target.value)}
                  placeholder="Go to page"
                  style={{
                    padding: '8px 12px',
                    width: '120px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                  }}
                />
                <button type="submit">Go</button>
              </form>
  </div>
)}
        </>
    )
}
export default MoviePage;