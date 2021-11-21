import { useMutation, useQueryClient } from "react-query";
import { postMovieArticleComment } from "../../../services/requests";
import {  useAuthDetails } from "../../../store";
import { MovieArticleComment } from "../../../components/Details/types";

type IComment = {
    movieId: string;
    author: string;
    content: string;
}

const useCreateComment = () => {
    const { authToken } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<MovieArticleComment, Error, IComment>((newComment) => {
        return postMovieArticleComment(authToken, newComment)
    }, {
        onMutate: (newComment) => {
            queryClient.cancelQueries(["comments", newComment.movieId]);

            const oldComments: MovieArticleComment[] = queryClient.getQueryData(['comments', newComment.movieId]);
            queryClient.setQueryData(['comments', newComment.movieId], () => {
                return [
                    ...oldComments,
                    {
                        ...newComment,
                        _id: Math.random().toString(),
                        _ownerId: Math.random().toString(),
                        _createdOn: Math.random().toString()
                    }
                ];
            });

            return () => queryClient.setQueryData(['comments', newComment.movieId], oldComments); // the snapshot for error case
        },
        onSettled: (newComment) => { // no matter if promise resolved or rejected we invalidate the query so we are sure we are getting the correct data from the server
            queryClient.invalidateQueries(['comments', newComment.movieId]);
        }
    });
}

export default useCreateComment;