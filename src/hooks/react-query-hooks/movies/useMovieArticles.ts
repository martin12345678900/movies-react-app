import { useQuery, useQueryClient } from "react-query";

import { getMovieArticles } from "../../../services/requests";
import { MovieArticle } from "../../../components/Details/types";


const useGetMovieArticles = () => {
    return useQuery<MovieArticle[], Error>(['movies'], getMovieArticles);
}

export default useGetMovieArticles;