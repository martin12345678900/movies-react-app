import { useQuery } from "react-query";
import { getMovieArticleLikesFromUser } from "../../../../services/requests";
import { useAuthDetails } from "../../../../store";

const useGetLikes = (movieId: string) => {
    const { userId } = useAuthDetails();
    
    return useQuery(['likes', movieId, userId], () => getMovieArticleLikesFromUser(movieId, userId));
}

export default useGetLikes;