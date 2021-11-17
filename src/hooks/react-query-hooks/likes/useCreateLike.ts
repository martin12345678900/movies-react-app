import { useMutation, useQueryClient } from "react-query";
import { postMovieArticleLike } from "../../../services/requests";
import {  useAuthDetails } from "../../../store";
import { MovieArticleLikeFromUser } from "../../../components/Details/types";


const useCreateLike = () => {
    const { authToken, userId } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<MovieArticleLikeFromUser, Error, string>((movieId) => {
        return postMovieArticleLike(authToken, { movieId })
    }, {
        onMutate: (movieId) => {
            queryClient.cancelQueries(["likes", movieId, userId]);

            const oldLikes: MovieArticleLikeFromUser[] = queryClient.getQueryData(['likes', movieId, userId]);
            queryClient.setQueryData(['likes', movieId, userId], () => {
                return [
                    ...oldLikes,
                    {
                        movieId,
                        _id: new Date().toString(),
                        _ownerId: new Date().toString(),
                        _createdOn: new Date().toString()
                    }
                ];
            });

            return () => queryClient.setQueryData(['likes', movieId, userId], oldLikes);
        },
        onSettled: (like) => {
            queryClient.invalidateQueries(['likes', like.movieId, userId]);
        }
    })
}

export default useCreateLike;