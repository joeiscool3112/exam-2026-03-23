function MovieRecent({ recentSearches, handleRecentClick }) {
    return (
        <>
        {recentSearches.length > 0 && (
        <div style={{
          margin: '40px auto',
          maxWidth: '900px',
          padding: '0 20px',
        }}>
          <h3 style={{ 
            color: '#e0e0e0', 
            marginBottom: '16px',
            textAlign: 'center',
            fontSize: '1.4rem'
          }}>
            Recent Searches
          </h3>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => handleRecentClick(term)}
                style={{
                  padding: '10px 22px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.25s ease',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
        </>
    )
}

export default MovieRecent;