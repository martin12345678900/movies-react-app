import { Link } from 'react-router-dom';

import classes from './Logo.module.css';

function Logo() {
    return (
        <div className={classes.logo}>
            <Link to="/">
                <h2 className={classes.title}>OneMovie</h2>
            </Link>
        </div>
    )
}

export default Logo;