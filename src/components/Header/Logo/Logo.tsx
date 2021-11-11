import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../UI/Image';

import './_logo.scss';

function Logo() {
    return (
        <div className="Logo">
            <Link to="/">
                <Image
                    imageSrc="https://th.bing.com/th/id/R.5eebdba556754091bfcae7839bd65da6?rik=7mP2jf6zMqYapw&pid=ImgRaw&r=0"
                    alt="logo"
                />
            </Link>
        </div>
    )
}

export default Logo;