// import { useState } from 'react';
import MoviesForum from './MoviesForum/MoviesForum';
import MovieCard from '../../MovieCard/MovieCard';

import Loader from '../../Loader/Loader';

import './_home.scss';
import useGetMovieArticles from '../../hooks/react-query-hooks/movies/useMovieArticles';

function Home() {
    const { data: movieArticles, isLoading } = useGetMovieArticles();

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <MoviesForum />
            <section>
                <div>
                    <h1 className="Heading">Movie Articles</h1>
                    <div className="HeadingWrapper">
                        {movieArticles?.map((movieArticle) =>
                            <MovieCard key={movieArticle._id} {...movieArticle} />)
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
