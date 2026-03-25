function MoviePage({
  currentPage,
  setCurrentPage,
  totalPages,
  gotoPage,
  setGotoPage,
  handleGoToPage,
  params
}) {

  if (totalPages <= 1) return null;

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '0 15px',
      textAlign: 'center'
    }}>

      {/* Prev - Page - Next */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '16px'
      }}>
        <button
          onClick={() => {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);

            const params = new URLSearchParams(window.location.search);
            params.set('page', String(newPage));
            window.history.pushState({}, '', `?${params.toString()}`);
          }}
          disabled={currentPage === 1}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '30px',
            border: 'none',
            background: currentPage === 1 ? '#555' : 'linear-gradient(90deg, #6b46c1, #a855f7)',
            color: '#fff',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            minWidth: '100px'
          }}
        >
          Prev
        </button>

        <span style={{
          fontSize: '17px',
          color: '#ddd',
          padding: '0 15px',
          minWidth: '140px'
        }}>
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            const params = new URLSearchParams(window.location.search);
            params.set('page', String(newPage));
            window.history.pushState({}, '', `?${params.toString()}`);
          }}
          disabled={currentPage === totalPages}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '30px',
            border: 'none',
            background: currentPage === totalPages ? '#555' : 'linear-gradient(90deg, #6b46c1, #a855f7)',
            color: '#fff',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            minWidth: '100px'
          }}
        >
          Next
        </button>
      </div>

      {/* Go to Page - Responsive */}
      <form
        onSubmit={handleGoToPage}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap'
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
            padding: '12px 16px',
            width: '160px',
            fontSize: '16px',
            borderRadius: '30px',
            border: '1px solid #666',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            textAlign: 'center'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 28px',
            fontSize: '16px',
            borderRadius: '30px',
            border: 'none',
            background: 'linear-gradient(90deg, #6b46c1, #a855f7)',
            color: '#fff',
            cursor: 'pointer',
            minWidth: '80px'
          }}
        >
          Go
        </button>
      </form>
    </div>
  );
}

export default MoviePage;