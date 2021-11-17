import React from 'react';
import classes from './CommentCard.module.css';

import Button from '../../UI/Button';

type CommentCardProps = {
    content: string;
    author: string;
    deleteCurrentComment: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ content, author, deleteCurrentComment }) => {
    return (
        <div className={classes.commentuser}>
            <p className={classes.commentcontent}>
                &#128173; {content}
                {deleteCurrentComment &&
                    <Button
                        type="button"
                        textContent="&#10006;"
                        onClick={deleteCurrentComment}
                        className={classes.commentdelete}
                    />}
                <i className={classes.commentname}>- {author}</i>
            </p>
        </div>
    );
}

export default CommentCard;
