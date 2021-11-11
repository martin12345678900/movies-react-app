import { useMutation, useQueryClient } from "react-query";
import { deleteMovieArticleComment } from "../../../../services/requests";
import { useAuthDetails } from "../../../../store";
import { MovieArticleComment } from "../../../Main/Details/types";
import { IDeleteDetails } from "../movies/useDeleteMovie";

const useDeleteComment = (movieId: string) => {
    const { authToken } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<IDeleteDetails, Error, string>((commentId: string) => {
        return deleteMovieArticleComment(commentId, authToken)
    }, {
        onMutate: (commentId) => {
            queryClient.cancelQueries(["comments", movieId]);

            const oldComments: MovieArticleComment[] = queryClient.getQueryData(['comments', movieId]);
            queryClient.setQueryData(['comments', movieId], () => {
                return oldComments.filter(comment => comment._id !== commentId);
            });

            return () => queryClient.setQueryData(['comments', movieId], oldComments); // spapshot
        },
        onSettled: () => {
            queryClient.invalidateQueries(['comments', movieId]);
        }
    })
}


export default useDeleteComment;