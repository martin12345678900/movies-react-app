import { useParams } from 'react-router-dom';

import CommentSection from './CommentSection/CommentSection';
import DetailsButtons from './DetailsButtons/DetailsButtons';
import Image from '../../UI/Image';


import classes from './Details.module.css';

import Loader from '../Loader/Loader';
import useGetSpecificMovieArticle from '../../hooks/react-query-hooks/movies/useGetSpecificMovieArticle';


function Details() {
    const { movieId }: { movieId: string; } = useParams();
    const { data: movieArticleDetails, isLoading } = useGetSpecificMovieArticle(movieId);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className={classes.details}>
            <div className={classes.container}>
                <h1 className={classes.containerTitle}>Movie title: {movieArticleDetails.title}</h1>
                <Image
                    className={classes.containerImage}
                    src={movieArticleDetails.img}
                    alt="movie"
                />
                <div className={classes.containerDetails}>
                    <h3 className={classes.description}>Movie Description</h3>
                    <p className={classes.p}>
                        {movieArticleDetails.description}
                    </p>
                    <DetailsButtons movieArticle={movieArticleDetails} />
                    <CommentSection id={movieArticleDetails._id} ownerId={movieArticleDetails._ownerId} />
                </div>
            </div>
        </section>
    );
}


export default Details;
