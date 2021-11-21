import { useQuery } from "react-query";

import { getMovieArticles } from "../../../services/requests";
import { MovieArticle } from "../../../components/Details/types";
import { useMemo } from "react";
import { filter } from "../../../utilities/filter";


const useGetMovieArticles = (searchParam: string) => {
    const queryResult = useQuery<MovieArticle[], Error>(['movies'], getMovieArticles);

    return {
        ...queryResult,
        data: useMemo(() => filter(queryResult.data, searchParam), [searchParam])
    }
}

export default useGetMovieArticles;
