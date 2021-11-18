import { useQuery } from "react-query";

import { getMovieArticles } from "../../../services/requests";
import { MovieArticle } from "../../../components/Details/types";


const useGetMovieArticles = (selectFn: (data: MovieArticle[]) => MovieArticle[]) => {
    return useQuery<MovieArticle[], Error>(['movies'], getMovieArticles, {
        select: selectFn
    });
}

export default useGetMovieArticles;
