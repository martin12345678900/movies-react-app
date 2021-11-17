import { useQuery, useQueryClient } from "react-query";
import { getSpecificMovieArticle } from "../../../services/requests";
import { MovieArticle } from "../../../components/Details/types";

const useGetSpecificMovieArticle = (movieId: string) => {
    const queryClient = useQueryClient();

    return useQuery<MovieArticle, Error>(["movies", movieId], () => getSpecificMovieArticle(movieId), {
        initialData: () => {
            const oldMovieArticles: MovieArticle[] = queryClient.getQueryData(["movies"]);
            const currentMovieArticle = oldMovieArticles?.find(movie => movie._id === movieId);

            if (currentMovieArticle) {
                return currentMovieArticle;
            }
        },
    });
}

export default useGetSpecificMovieArticle;