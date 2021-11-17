import { useQuery } from "react-query";
import { getCartItems, ReturnCartType } from "../../../services/requests";
import { useAuthDetails } from "../../../store";

const useGetCart = () => {
    const { userId } = useAuthDetails();

    return useQuery<ReturnCartType[], Error>(["cart", userId], () => getCartItems(userId), {
        enabled: !!userId,
    });
}

export default useGetCart;