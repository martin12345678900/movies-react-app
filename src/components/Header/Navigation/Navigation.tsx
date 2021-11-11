import React, { Fragment, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { handleLogout } from '../../../store/auth-slice';

import './_navigation.scss';

import Hamburger from './Hamburger/Hamburger';
import { useAppDispatch, useAppSelector  } from '../../../store';
import useGetCart from '../../hooks/react-query-hooks/cart/useGetCart';
import Loader from '../../Loader/Loader';

const Navigation = () => {
    const { data: items, isLoading } = useGetCart();
    const [isActive, setIsActive] = useState(false);

    const isAuthenticated = useAppSelector(state => state.isAuthenticated);
    const dispatch = useAppDispatch();

    const toogleActiveState = useCallback(() => setIsActive(prevActiveState => !prevActiveState), []);
    const onLogout = () => dispatch(handleLogout());

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <nav className="Nav">
                <ul className={`Nav__list ${isActive ? `Nav__list--active` : `Nav__list--unactive`}`}>
                    {
                        isAuthenticated
                            ?
                            <Fragment>
                                <li>
                                    <Link to="/cart">Cart {items.reduce((itemAcc, item) => itemAcc += item.quantity, 0)}</Link>
                                </li>
                                <li>
                                    <Link to="/movies/create">Create Movie Article</Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={onLogout}>Logout</Link>
                                </li>
                                <li>
                                    <Link to="/filter">Search Movies</Link>
                                </li>
                            </Fragment>
                            :
                            <Fragment>
                                <li>
                                    <Link to="/auth/register">Sign up</Link>
                                </li>
                                <li>
                                    <Link to="/auth/login">Sign in</Link>
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
