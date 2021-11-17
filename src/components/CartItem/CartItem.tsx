import React from 'react';
import classes from './CartItem.module.css';

import { Item } from '../../store/cart-types';
import Image from '../../UI/Image';
import Button from '../../UI/Button';
import useUpdateCartItem from '../../hooks/react-query-hooks/cart/useUpdateCartItem';
import useDeleteCartItem from '../../hooks/react-query-hooks/cart/useDeleteCartItem';

import { ImCross } from 'react-icons/im';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

type ChangeType = "INCREASE" | "DECREASE";

const CartItem: React.FC<Item> = React.memo((props) => {
    const updateMutation = useUpdateCartItem();
    const deleteMutation = useDeleteCartItem();
    
    const onDeleteCartItemClickHandler = () => deleteMutation.mutate(props._id);
    
    const onChangeQuantityClickHandler = (type: ChangeType) => {
        const currentItemQuantity = props.quantity;
        updateMutation.mutate({
            cartId: props._id,
            updatedCartItem: {
                ...props,
                quantity: type === 'INCREASE' ? currentItemQuantity + 1 : currentItemQuantity - 1
            } 
        });
    }

    if (props.quantity === 0) {
        onDeleteCartItemClickHandler();
    }
    
    return (
        <div className={classes.item}>
            <ImCross fontSize={30} cursor="pointer" onClick={onDeleteCartItemClickHandler} />
            <Image
                src={props.img}
                alt="item"
                className={classes.cartimg}
            />
            <span className={classes.carttitle}>{props.title}</span>
            <div className={classes.actions}>
                <AiOutlinePlus
                    fontSize={20} 
                    className={classes.action}
                    onClick={() => onChangeQuantityClickHandler("INCREASE")}
                />
                <span>{props.quantity}</span>
                <AiOutlineMinus
                    fontSize={20} 
                    className={classes.action}
                    onClick={() => onChangeQuantityClickHandler("DECREASE")}
                />
            </div>
            <span className={classes.cartprice}>$ {props.price}</span>
        </div>
    )
});

export default CartItem;
