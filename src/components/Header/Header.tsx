import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

import './_header.scss';

function Header() {
    return (
        <header className="Header">
            <Logo />
            <Navigation />
        </header>
    );
}

export default Header;