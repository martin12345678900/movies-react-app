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
<<<<<<< HEAD
}
=======
}
>>>>>>> 9c762f610d77750bbe2e3dc8913e9f3aea97b9a4
