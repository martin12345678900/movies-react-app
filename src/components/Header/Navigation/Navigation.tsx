import React, { Fragment, useCallback, useContext, useEffect, useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsFillCartFill }  from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';

import { logoutThunk } from '../../../store/auth-slice';

import classes from './Navigation.module.css';

import Hamburger from './Hamburger/Hamburger';
import { useAppDispatch, useAppSelector  } from '../../../store';
import useGetCart from '../../../hooks/react-query-hooks/cart/useGetCart';
import Input from '../../../UI/Input';
import { CartType } from '../../../services/requests';

const activeStyle = {
    color: '#D70040'
}
const Navigation: React.FC<{ setSearchParam: React.Dispatch<React.SetStateAction<string>>}> = ({ setSearchParam }) => {
    const { data: cartItems } = useGetCart();

    const [isActive, setIsActive] = useState(false);

    const isAuthenticated = useAppSelector(state => state.isAuthenticated);
    const dispatch = useAppDispatch();

    const toogleActiveState = useCallback(() => setIsActive(prevActiveState => !prevActiveState), []);
    const onLogout = () => dispatch(logoutThunk());

    const cartItemsQuantity = cartItems?.reduce((acc: number, value: CartType) => acc += +value.quantity, 0);

    return (
        <>
            <nav className={classes.nav}>
                <ul className={`${classes.navlist} ${isActive ? `${classes.active}` : `${classes.unactive}`}`}>
                    {
                        isAuthenticated
                            ?
                            <Fragment>
                                <li>
                                    <NavLink activeStyle={activeStyle} to="/cart">
                                        <BsFillCartFill fontSize={18}/> {cartItemsQuantity}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={activeStyle} to="/movies/create">Create Movie Article</NavLink>
                                </li>
                                <li>
                                    <Link to="/" onClick={onLogout}>Logout</Link>
                                </li>
                                <li>
                                    <Input 
                                        type="text" 
                                        onChange={e => setSearchParam(e.target.value)}
                                        placeholder="Search..."
                                        className={classes.search}
                                    />
                                    <ImSearch fontSize={15} className={classes.icon}/>
                                </li>
                            </Fragment>
                            :
                            <Fragment>
                                <li>
                                    <NavLink activeStyle={activeStyle} to="/auth/register">Sign up</NavLink>
                                </li>
                                <li>
                                    <NavLink activeStyle={activeStyle} to="/auth/login">Sign in</NavLink>
                                </li>
                            </Fragment>
                    }
                </ul>
                <Hamburger isActive={isActive} toogle={toogleActiveState} />
            </nav>
        </>
    )
}

export default Navigation;
