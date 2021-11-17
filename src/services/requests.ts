import { MovieArticle, MovieArticleComment, MovieArticleLikeFromUser } from '../components/Details/types';
import { UserAuth } from '../store/auth-slice.types';
import * as api from './api';

export type MovieArticleDataType = {
    title: string;
    description: string;
    img: string;
    price: number;
}

export type UserDataObj = {
    email: string;
    username?: string;
    password: string;
}

export type CartType = {
    price: number;
    quantity: number;
    title: string;
    description: string;
    img: string;
}

export type ReturnCartType = {
    _id: string;
    _ownerId: string;
} & CartType;

export async function getMovieArticles(): Promise<MovieArticle[]> {
    return await api.get("/data/movies");
}

export async function postMovieArticle(authToken: string, data: MovieArticleDataType): Promise<MovieArticle> {
    return await api.post('/data/movies', authToken, data);
}

export async function deleteMovieArticle(movieId: string, authToken: string): Promise<{ _deletedOn: number; }> {
    return await api.del(`/data/movies/${movieId}`, authToken);
}

export async function getMovieArticleLikesCount(movieId: string): Promise<number> {
    return await api.get(`/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)
}

export async function getMovieArticleCommentsCount(movieId: string): Promise<number> {
    return await api.get(`/data/comments?where=movieId%3D%22${movieId}%22&count`);
}

export async function getSpecificMovieArticle(movieId: string): Promise<MovieArticle> {
    return await api.get(`/data/movies/${movieId}`);
}

export async function getMovieArticleLikesFromUser(movieId: string, userId: string): Promise<MovieArticleLikeFromUser[]> {
    return await api.get(`/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`)
}

export async function postMovieArticleLike(authToken: string, data: {
    movieId: string;
}): Promise<MovieArticleLikeFromUser> {
    return await api.post('/data/likes', authToken, data);
}

export async function getMovieArticleComments(movieId: string): Promise<MovieArticleComment[]> {
    return await api.get(`/data/comments?where=movieId%3D%22${movieId}%22`)
}

export async function postMovieArticleComment(authToken: string, data: {
    movieId: string;
    author: string;
    content: string;
}): Promise<MovieArticleComment> {
    return await api.post('/data/comments', authToken, data);
}

export async function deleteMovieArticleComment(commentId: string, authToken: string): Promise<{ _deletedOn: number; }> {
    return await api.del(`/data/comments/${commentId}`, authToken);
}

export async function updateMovieArticle(movieId: string, authToken: string, data: MovieArticleDataType): Promise<MovieArticle> {
    return await api.put(`/data/movies/${movieId}`, authToken, data);
}

export async function signUser(endpoint: string, userDataObj: UserDataObj): Promise<UserAuth> {
    return await api.post(`/users/${endpoint.toLowerCase()}`, null, userDataObj)
}

export async function getCartItems(userId: string): Promise<ReturnCartType[]> {
    return await api.get(`/data/cart?where=_ownerId%3D%22${userId}%22`);
}

export async function postCartItem(authToken: string, data: CartType): Promise<ReturnCartType> {
    return await api.post('/data/cart', authToken, data);
}

export async function updateCartItem(id: string, authToken: string, data: CartType): Promise<ReturnCartType> {
    return await api.put(`/data/cart/${id}`, authToken, data);
}

export async function deleteCartItem(id: string, authToken: string) {
    return await api.del(`/data/cart/${id}`, authToken);
}

export async function getUserDetails() {
    return await api.get('/users/me');
}
