import CartItem from '../CartItem/CartItem';

import classes from './Cart.module.css';
import useGetCart from '../../hooks/react-query-hooks/cart/useGetCart';
import Loader from '../Loader/Loader';

function Cart() {
    const { data: cartItems, isLoading } = useGetCart();

    if (isLoading) {
        return <Loader />;
    }

    const totalQuantity = cartItems.reduce((acc, item) => acc += Number(item.quantity), 0);
    const totalPrice = cartItems.reduce((acc, item) => acc += Number(item.quantity) * Number(item.price), 0);

    return (
        <section className={classes.cartsection}>
            <div className={classes.cart}>
                <h1 style={{ paddingLeft: ".5rem", fontSize: "2.8rem" }}>Shopping Cart</h1>
                {
                    cartItems.map((cartItem) => {
                        return <CartItem
                            key={cartItem._id}
                            {...cartItem}
                        />
                    })
                }
                <div className={classes.summary}>
                    <h1 className={classes.summarytitle}>Sub total</h1>
                    <span className={classes.summaryitems}>Total Items: {totalQuantity}</span>
                    <span className={classes.summaryprice}>Total Price: $ {totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </section>
    )
}

export default Cart;
