import { useMutation, useQueryClient } from 'react-query';
import { deleteCartItem, ReturnCartType } from '../../../../services/requests';

import { useAuthDetails } from '../../../../store/index';
import { IDeleteDetails } from '../movies/useDeleteMovie';

const useDeleteCartItem = () => {
    const { authToken, userId } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<IDeleteDetails, Error, string>((cartId) => deleteCartItem(cartId, authToken), {
        onMutate: (cartId) => {
            queryClient.cancelQueries(["cart", userId]);

            const oldCartItems: ReturnCartType[] = queryClient.getQueryData(["cart", userId]);
            queryClient.setQueryData(["cart", userId], () => {
                return oldCartItems.filter(item => item._id !== cartId);
            });

            return () => queryClient.setQueryData(["cart", userId], oldCartItems);
        },
        onSettled: () => queryClient.invalidateQueries(["cart", userId])
    })
}

export default useDeleteCartItem;