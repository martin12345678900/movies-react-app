import { useMutation, useQueryClient } from "react-query";
import { deleteMovieArticle } from "../../../../services/requests";
import { useAuthDetails } from "../../../../store";
import { MovieArticle } from "../../../Main/Details/types";


export type IDeleteDetails = {
    _deletedOn: number;
}

const useDeleteMovie = () => {
    const { authToken } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<IDeleteDetails, Error, string>((movieId) => {
        return deleteMovieArticle(movieId, authToken)
    }, {
        onMutate: (movieId) => {
            queryClient.cancelQueries(["movies"]);

            const oldMovies: MovieArticle[] = queryClient.getQueryData(['movies']);
            if (!oldMovies) {
                return;
            }
            queryClient.setQueryData(['movies'], () => {
                return oldMovies.filter(movieArticle => movieArticle._id !== movieId);
            });

            return () => queryClient.setQueryData(['movies'], oldMovies);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['movies']);
        }
    });
}

export default useDeleteMovie;