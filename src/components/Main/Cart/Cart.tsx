import CartItem from '../../CartItem/CartItem';

import Button from '../../../UI/Button';

import './_cart.scss';
import useGetCart from '../../hooks/react-query-hooks/cart/useGetCart';
import Loader from '../../Loader/Loader';

function Cart() {
    const { data: items, isLoading } = useGetCart();

    if (isLoading) {
        return <Loader />;
    }

    const totalQuantity = items.reduce((acc, item) => acc += Number(item.quantity), 0);
    const totalPrice = items.reduce((acc, item) => acc += Number(item.quantity) * Number(item.price), 0);

    return (
        <div className={`Cart ${!items.length && 'Cart--empty'}`}>
            {
                items.map((item) => {
                    return <CartItem
                        key={item._id}
                        {...item}
                    />
                })
            }
            <div className="Summary">
                <h4 className="Summary__title">Cart Summary</h4>
                <div className="CartDetails">
                    <span className="CartDetails__items">TOTAL: ({totalQuantity}) items)</span>
                    <span className="CartDetails__price">${totalPrice}</span>
                </div>
                <Button
                    type="button"
                    className="Summary__btn"
                    textContent="Proceed To Checkout"
                />
            </div>
        </div>
    )
}

export default Cart;
