import React from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

import classes from './Header.module.css';

const Header: React.FC<{ setSearchParam: React.Dispatch<React.SetStateAction<string>>}> = ({ setSearchParam }) => {
    return (
        <header className={classes.header}>
            <Logo />
            <Navigation setSearchParam={setSearchParam} />
        </header>
    );
}

export default Header;