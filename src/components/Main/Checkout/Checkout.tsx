import './_checkout.scss';
import { Link } from 'react-router-dom';

function Checkout() {
    return (
        <div className="Checkout">
            <h1>Your order was succesfsul!</h1>
            <h2>Thank you for choosing our movie shop!</h2>
            <Link to="/">
                back to home page
            </Link>
        </div>
    )
}

export default Checkout;