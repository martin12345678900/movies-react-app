import { useState, useEffect, useRef, MutableRefObject } from "react";
import MovieCard from "../../MovieCard/MovieCard";

import { MovieArticle } from "../Details/types";

import Loader from '../../Loader/Loader';

import './_filter.scss';
import Input from "../../../UI/Input";
import useGetMovieArticles from "../../hooks/react-query-hooks/movies/useMovieArticles";


function Filter() {
    const { data: movieArticles, isLoading } = useGetMovieArticles();
    
    const [searchInput, setSearchInput] = useState('INVALID!');
    const [movieSeacrches, setMovieSearches] = useState<MovieArticle[]>([]);
    const searchInputRef: MutableRefObject<HTMLInputElement> = useRef(null);

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const getSearchResults = () => {
            if (searchInputRef.current.value === searchInput) {
                const inputSearchResults =
                    movieArticles
                        .reduce((articles: MovieArticle[], singleArticle: MovieArticle): MovieArticle[] => {
                            if (singleArticle.title
                                .concat(singleArticle.description)
                                .toLowerCase()
                                .includes(searchInput.toLowerCase())) {
                                articles.push(singleArticle)
                            };

                            return articles;
                        }, []);

                setMovieSearches(inputSearchResults);
            }
        }

        getSearchResults();

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput, movieArticles]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="Search">
            <h2 className="Search__title">Search Your Favourite Movies</h2>
            <div className="Filter">
                <Input
                    type="text"
                    placeholder="Search..."
                    onChange={e => setSearchInput(e.target.value)}
                    ref={searchInputRef}
                    name="search"
                />
                <div className="Filter__search"></div>
            </div>
            <div className="Search__results">
                {
                    !movieSeacrches.length
                        ? <p className="Search__notFound">No currently found results from your search :(</p>
                        : movieSeacrches.map((searchResult) => (
                            <MovieCard key={searchResult._id} {...searchResult} />
                        ))
                }
            </div>
        </div>
    )
}

export default Filter;
