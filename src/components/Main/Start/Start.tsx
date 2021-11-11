import { useQueryClient } from 'react-query';
import { Link } from "react-router-dom";
import { getMovieArticles } from '../../../services/requests';
import { MovieArticle } from '../Details/types';
import './_start.scss';

function Start() {
    const queryClient = useQueryClient();
    queryClient.prefetchQuery<MovieArticle[], Error>(["movies"], getMovieArticles, {
        cacheTime: Infinity
    });
    
    return (
        <div className="Start">
            <h3 className="Start__title">START SEARCHING YOUR FAVOURITE MOVIES</h3>
            <Link
                to="/"
                className="Start__link"
            >
                Go To Search
            </Link>
        </div>
    );
}

export default Start;