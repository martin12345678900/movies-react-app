import { useMutation, useQueryClient } from 'react-query';
import { postMovieArticle } from '../../../services/requests';
import { MovieArticle } from '../../../components/Details/types';

import { useAuthDetails } from '../../../store/index';

export type IMovieArticle = {
    title: string;
    img: string;
    price: number;
    description: string;
}

const useCreateMovie = () => {
    const { authToken } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<MovieArticle, Error, IMovieArticle>((newMovieArticle) => {
        return postMovieArticle(authToken, newMovieArticle)
    }, {
        onMutate: (newMovieArticle) => {
            queryClient.cancelQueries(["movies"]);

            const oldMovies: MovieArticle[] = queryClient.getQueryData(['movies']);
            if (!oldMovies) {
                return;
            }
            queryClient.setQueryData(['movies'], () => {
                return [
                    ...oldMovies, {
                        ...newMovieArticle,
                        _id: Math.random().toString(),
                        _ownerId: Math.random().toString()
                    }
                ];
            });
            
            return () => queryClient.setQueryData('movies', oldMovies);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['movies']);
        }
    })
}

export default useCreateMovie;