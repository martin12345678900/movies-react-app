import { MovieArticle } from "../components/Details/types";


export const filter = (movieArticles: MovieArticle[], searchParam: string): MovieArticle[] => {
    return movieArticles.filter((movieArticle) => {
        const { title, description } = movieArticle;

        if (
            title
            .concat(description)
            .toLowerCase()
            .includes(searchParam.toLowerCase())
        ) {
            return movieArticle;
        }
    })
}
