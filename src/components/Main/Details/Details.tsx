import { useParams } from 'react-router-dom';

import CommentSection from './CommentSection/CommentSection';
import DetailsButtons from './DetailsButtons/DetailsButtons';
import Image from '../../../UI/Image';


import './_details.scss';

import Loader from '../../Loader/Loader';
import useGetSpecificMovieArticle from '../../hooks/react-query-hooks/movies/useGetSpecificMovieArticle';


function Details() {
    const { movieId } = useParams();
    const { data: movieArticleDetails, isLoading } = useGetSpecificMovieArticle(movieId);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="Details">
            <div className="Container">
                <h1 className="ContainerTitle">Movie title: {movieArticleDetails.title}</h1>
                <Image
                    className="ContainerImage"
                    imageSrc={movieArticleDetails.img}
                    alt="movie"
                />
                <div className="ContainerDetails">
                    <h3 className="ContainerDetails__description">Movie Description</h3>
                    <p className="ContainerDetails__p">
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
