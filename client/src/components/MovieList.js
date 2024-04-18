import React, { useEffect, useState } from 'react';
import Movie from './Movie';
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://hoblist.com/api/movieList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: "movies",
                    language: "kannada",
                    genre: "all",
                    sort: "voting"
                })
            });
            const data = await response.json();

            setMovies(data.result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <React.Fragment>
            <div className='w-full max-w-6xl mx-auto'>

                <h2 className='text-center text-3xl my-6'>Movies</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="loader-container">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>Loading...
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2'>
                        {movies.map(movie => (
                            <div key={movie._id} className='my-4 bg-white border-y mx-4 shadow-lg shadow-md-hover rounded-md'>
                                <Movie movie={movie} />
                                <button className='w-full bg-blue-400 p-2 rounded-lg'>Watch trailer</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default MovieList;
