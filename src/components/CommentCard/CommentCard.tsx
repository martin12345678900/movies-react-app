import React from 'react';
import './_commentCard.scss';

import Button from '../../UI/Button';

type CommentCardProps = {
    content: string;
    author: string;
    deleteCurrentComment: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ content, author, deleteCurrentComment }) => {
    return (
        <div className="CommentUser">
            <p className="CommentContent">
                &#128173; {content}
                {deleteCurrentComment &&
                    <Button
                        type="button"
                        className="CommentDelete"
                        textContent="&#10006;"
                        onClickHandler={deleteCurrentComment}
                    />}
                <i className="CommentName">- {author}</i>
            </p>
        </div>
    );
}

export default CommentCard;
