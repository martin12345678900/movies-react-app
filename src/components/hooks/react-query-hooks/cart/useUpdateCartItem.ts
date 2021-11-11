import { useMutation, useQueryClient } from "react-query";
import { ReturnCartType, updateCartItem } from '../../../../services/requests';
import { useAuthDetails } from "../../../../store";

type IVariables = {
    cartId: string;
    updatedCartItem: ReturnCartType;
}

const useUpdateCartItem = () => {
    const { authToken, userId } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<ReturnCartType, Error, IVariables>(({ cartId, updatedCartItem }) => {
        return updateCartItem(cartId, authToken, updatedCartItem)
    }, {
        onMutate: ({ updatedCartItem, cartId }) => {
            queryClient.cancelQueries(["cart", userId]);

            const oldCartItems: ReturnCartType[] = queryClient.getQueryData(["cart", userId]);
            queryClient.setQueryData(["cart", userId], () => {
                return oldCartItems.map(cartItem => {
                    if (cartItem._id === cartId) {
                        return updatedCartItem;
                    }
                    return cartItem;
                });
            });

            return () => queryClient.setQueryData(["cart", userId], oldCartItems);
        },
        onSettled: () => queryClient.invalidateQueries(["cart", userId])
    })
}

export default useUpdateCartItem;