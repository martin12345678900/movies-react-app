import { useQuery } from 'react-query';
import { MovieArticleComment } from '../../../Main/Details/types';
import { getMovieArticleComments } from '../../../../services/requests';

const useGetComments = (movieId: string) => {
    return useQuery<MovieArticleComment[], Error>(['comments', movieId], () => getMovieArticleComments(movieId));
}

export default useGetComments;