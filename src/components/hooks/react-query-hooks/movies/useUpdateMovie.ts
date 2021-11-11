import { useMutation, useQueryClient } from "react-query";
import { updateMovieArticle } from "../../../../services/requests";
import { useAuthDetails } from "../../../../store";
import { MovieArticle } from "../../../Main/Details/types";

type IUpdated = {
    movieId: string;
    updatedMovieArticle: MovieArticle;
};

const useUpdateMovie = () => {
    const { authToken } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<MovieArticle, Error, IUpdated>(({ movieId, updatedMovieArticle }) => {
        return updateMovieArticle(movieId, authToken, updatedMovieArticle)
    }, {
        onMutate: ({ movieId, updatedMovieArticle }) => {
            queryClient.cancelQueries(["movies"]);
            
            const oldMovieArticle = queryClient.getQueryData(['movies', movieId]);
            queryClient.setQueryData(['movies', movieId], updatedMovieArticle);

            return () => queryClient.setQueryData(['movies', movieId], oldMovieArticle);
        },
        onSettled: (movie) => {
            queryClient.invalidateQueries(['movies', movie._id]);
        }
    })
}

export default useUpdateMovie;