import React, { MutableRefObject, useRef } from 'react';

import CommentCard from '../../CommentCard/CommentCard';

import classes from './Comments.module.css';
import { useAppSelector } from '../../../store';
import Button from '../../../UI/Button';

import Loader from '../../Loader/Loader';
import useGetComments from '../../../hooks/react-query-hooks/comments/useGetComments';
import useCreateComment from '../../../hooks/react-query-hooks/comments/useCreateComment';
import useDeleteComment from '../../../hooks/react-query-hooks/comments/useDeleteComment';

type CommentProps = {
    id: string;
    ownerId: string;
}

const CommentSection: React.FC<CommentProps> = React.memo((props) => {
    const { userAuthState, isAuthenticated } = useAppSelector(state => state);
 
    const { data: movieArticleComments, isLoading } = useGetComments(props.id);
    const createCommentMutation = useCreateComment();
    const deleteCommentMutation = useDeleteComment(props.id);

    const contentRef: MutableRefObject<HTMLTextAreaElement> = useRef(null);

    const onPostNewCommentSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        createCommentMutation.mutate({
            movieId: props.id,
            author: userAuthState.username,
            content: contentRef?.current?.value
        });
        contentRef.current.value = '';
    };

    const onDeleteCommentClickHandler = (commentId: string): void => {
        deleteCommentMutation.mutate(commentId);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={classes.comments}>
            <h2 className={classes.title}>Leave your comments here: &#128172;</h2>
            {
                movieArticleComments.map((comment) =>
                    <CommentCard
                        key={comment._id}
                        content={comment.content}
                        author={comment.author}
                        deleteCurrentComment={
                            userAuthState._id === comment._ownerId
                            && onDeleteCommentClickHandler.bind(null, comment._id)
                        }
                    />)
            }
            {
                userAuthState._id !== props.ownerId && isAuthenticated &&
                <form onSubmit={onPostNewCommentSubmitHandler} className={classes.commentsform}>
                    <textarea
                        className={classes.field}
                        name="content"
                        placeholder="Enter your expression from this movie"
                        rows={5}
                        cols={50}
                        ref={contentRef}
                    >
                    </textarea>
                    <Button
                        type="submit"
                        className={classes.submit}
                        textContent="Post comment"
                    />
                </form>
            }
        </div>
    );
});

export default CommentSection;
