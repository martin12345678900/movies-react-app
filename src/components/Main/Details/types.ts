export type MovieArticle = {
    _ownerId: string;
    title: string;
    description: string;
    img: string;
    _id: string;
    price: number;
}

export type MovieArticleComment = {
    _ownerId: string;
    content: string;
    movieId: string;
    _id: string;
    createdOn: number;
    author: string;
}

export type MovieArticleLikeFromUser = {
    _id: string;
    _createdOn: number;
    movieId: string;
    _ownerId: string;
}

export type MovieArticleDetails = {
    movieArticle: MovieArticle;
    movieArticleLikesFromUser: MovieArticleLikeFromUser[];
    movieArticleComments: MovieArticleComment[];
}

export type AddMovieArticleCommentAction = {
    type: 'ADD_MOVIE_ARTICLE_COMMENT';
    payload: MovieArticleComment;
}

export type PostMovieArticleLikeAction = {
    type: 'ADD_MOVIE_ARTICLE_LIKE';
    payload: MovieArticleLikeFromUser;
}

export type DeleteMovieArticleCommentAction = {
    type: 'DELETE_MOVIE_ARTICLE_COMMENT';
    payload: string;
}

export type SetMovieArticleDataAction = {
    type: 'SET_MOVIE_ARTICLE_DATA';
    payload: MovieArticleDetails;
}

export type DetailsState = { data: MovieArticleDetails } & {
    UI: {
        isDataLoaded: boolean
    }
}
