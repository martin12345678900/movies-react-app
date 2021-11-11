import React, { useEffect } from 'react';
import './_cartItem.scss';

import { Item } from '../../store/cart-types';
import Image from '../../UI/Image';
import Button from '../../UI/Button';
import useUpdateCartItem from '../hooks/react-query-hooks/cart/useUpdateCartItem';
import useDeleteCartItem from '../hooks/react-query-hooks/cart/useDeleteCartItem';

type ChangeType = "INCREASE" | "DECREASE";

const CartItem: React.FC<Item> = React.memo((props) => {
    const updateMutation = useUpdateCartItem();
    const deleteMutation = useDeleteCartItem();

    useEffect(() => {
        if (props.quantity === 0) {
            deleteMutation.mutate(props._id)
        }
    }, [props.quantity, deleteMutation, props._id]);

    const onChangeQuantityClickHandler = (type: ChangeType) => {
        updateMutation.mutate({
            cartId: props._id,
            updatedCartItem: {
                ...props,
                quantity: type === 'INCREASE' ? props.quantity + 1 : props.quantity - 1
            } 
        });
    }

    const onDeleteCartItemClickHandler = () => deleteMutation.mutate(props._id);
    
    return (
        <div className="Item">
            <Image
                imageSrc={props.img}
                alt="item"
            />
            <div className="Details">
                <p className="Details__title">{props.title}</p>
                <p className="Details__description">{props.description}</p>
                <p className="Details__price">$ {props.price}</p>
            </div>
            <div className="Actions">
                <div className="Actions__quantity">
                    <Button
                        type="button"
                        className="Actions__quantity__manipulate"
                        textContent="&#8593;"
                        onClickHandler={() => onChangeQuantityClickHandler("INCREASE")}
                    />
                    <label htmlFor="qty">{props.quantity}</label>
                    <Button
                        type="button"
                        className="Actions__quantity__manipulate"
                        textContent="&#8595;"
                        onClickHandler={() => onChangeQuantityClickHandler("DECREASE")}
                    />
                </div>
                <Button
                    type="button"
                    className="Actions__btn"
                    textContent="&#10060;"
                    onClickHandler={onDeleteCartItemClickHandler}
                />
            </div>
        </div >
    )
});

export default CartItem;