import { useQuery } from "react-query";

import { getMovieArticles } from "../../../../services/requests";
import { MovieArticle } from "../../../Main/Details/types";


const useGetMovieArticles = () => {
    return useQuery<MovieArticle[], Error>(['movies'], getMovieArticles);
}

export default useGetMovieArticles;