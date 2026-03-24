function MovieHomePage() {
    const refreshPage = () => {
    window.location.reload(false); 
    };
    return(
        <>
        <h1 onClick={refreshPage} >Movie Search</h1>
        </>
    )
}

export default MovieHomePage;