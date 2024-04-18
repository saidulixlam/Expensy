import React from 'react';

const Movie = ({ movie }) => {
    return (
        <div className="max-w-xl mx-auto bg-white rounded-md overflow-hidden mb-8">
            <div className="flex justify-between items-center p-4 h-full">
                {/* Buttons for upvote and downvote */}
                <div className="flex flex-col gap-4 justify-between">
                    <button className="mt-5 flex items-center focus:outline-none ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 17a1 1 0 01-1-1V6.414l-3.293 3.293a1 1 0 11-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 11-1.414 1.414L11 6.414V16a1 1 0 01-1 1z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <p className="text-gray-700 text-center text-xl">{movie.totalVoted}</p>
                    <button className="flex items-center focus:outline-none ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v9.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L11 13.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h2 className='text-center'>Votes</h2>
                </div>

                {/* Image */}
                <div className="flex-grow h-40 max-w-50 p-1 mx-1">
                    <img src={movie.poster} alt={movie.title} className="rounded-md w-full h-full object-cover mt-2" />
                </div>

                {/* Title and other details */}
                <div className="ml-2 w-40 max-h-40">
                    <div className="text-xl font-semibold mb-2">{movie.title}</div>
                    <p className='text-sm text-gray-500'>
                        Genre:&nbsp;
                        <span className='text-gray-700'>
                            {movie.genre}
                        </span>
                    </p>
                    <p className='text-sm text-gray-500'>
                        Director:&nbsp;
                        <span className='text-gray-700'>
                            {movie.director}
                        </span>
                    </p>
                    <p className='text-sm text-gray-500 truncate'>
                        Starring:&nbsp;
                        <span className='text-gray-700'>
                            {movie.stars}
                        </span>
                    </p>
                    <p className='text-sm'>
                        <span className='text-gray-700'>
                            Mins |&nbsp;
                        </span>
                        <span className='text-gray-700'>
                            {movie.language} |&nbsp;
                        </span>
                        <span className='text-gray-700'>
                            2 Apr
                        </span>
                    </p>
                    <p className='text-sm'>
                        <span className='text-blue-400'>
                            {movie.pageViews} views |&nbsp;
                        </span>
                        <span className='text-gray-700'>
                            Voted by {movie.totalVoted}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Movie;
