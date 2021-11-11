import React  from 'react';
import './_hamburger.scss';

type HamburgerProps = {
    isActive: boolean;
    toogle: () => void;
}

const Hamburger: React.FC<HamburgerProps> = React.memo(({ isActive, toogle}) => {
    return (
        <button onClick={toogle} className={`hamburger hamburger--spin ${isActive && 'is-active'}`} type="button">
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    );
});

export default Hamburger;

