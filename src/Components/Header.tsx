import React from 'react';

import sgdgLogo from '../assets/sgdg.jpeg'

const Header = () => {
    return (
        <div className="flex flex-col">

            <img src={sgdgLogo}
                alt="SGDG Logo"
                className="h-34 w-auto object-contain" />

        </div>
    )
}

export default Header