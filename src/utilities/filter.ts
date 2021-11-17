import { MovieArticle } from "../components/Details/types";


export const filter = (movieArticles: MovieArticle[], searchParam: string): MovieArticle[] => {
   return movieArticles.reduce((acc: MovieArticle[], value: MovieArticle) => {
       const { title, description } = value;

       if (title.concat(description).toLowerCase().includes(searchParam.toLowerCase())) acc.push(value);

       return acc;
   }, []);
}