import { useMutation, useQueryClient } from 'react-query';
import { CartType, postCartItem, ReturnCartType } from '../../../services/requests';
import { useAuthDetails } from '../../../store';


const useCreateCartItem = () => {
    const { authToken, userId } = useAuthDetails();
    const queryClient = useQueryClient();

    return useMutation<ReturnCartType, Error, CartType>(newCartItem =>
        postCartItem(authToken, newCartItem)
    , {
        onMutate: (newCartItem) => {
            queryClient.cancelQueries(["cart", userId]);

            const oldCartItems: CartType[] = queryClient.getQueryData(["cart", userId]);
            queryClient.setQueryData(["cart", userId], () => {
                return [
                    ...oldCartItems, {
                        ...newCartItem,
                        _id: new Date().toISOString(),
                        _ownerId: new Date().toISOString(),
                        _createdOn: new Date().toISOString()
                    }
                ]
            });

            return () => queryClient.setQueryData(["cart", userId], oldCartItems);
        },
/*         onSuccess: (createdCartItem) => {
            queryClient.setQueryData(["cart", userId], (old: ReturnCartType[]) => {
                return [...old, createdCartItem];
            })
        } */
        onSettled: () => queryClient.invalidateQueries(["cart", userId]) // onSuccess and onError
    })
}

export default useCreateCartItem;