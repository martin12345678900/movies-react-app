import CartItem from '../CartItem/CartItem';

import Button from '../../UI/Button';

import './_cart.scss';
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
        <section className="CartSection">
            <div className={`Cart ${!cartItems.length && 'Cart--empty'}`}>
                <h1 style={{ paddingLeft: ".5rem", fontSize: "2.8rem" }}>Shopping Cart</h1>
                {
                    cartItems.map((cartItem) => {
                        return <CartItem
                            key={cartItem._id}
                            {...cartItem}
                        />
                    })
                }
                <div className="Summary">
                    <h1 className="Summary__title">Sub total</h1>
                    <span className="Summary__totalItems">Total Items: {totalQuantity}</span>
                    <span className="Summary__totalPrice">Total Price: $ {totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </section>
    )
}

export default Cart;
