import React from 'react';
import logo from '../assets/sgdg.jpeg'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className='w-full px-8'>
            <nav className='h-24 flex items-center justify-between'>
                <div>
                    <img src={logo}
                        alt="SGDG Logo"
                        className='h-34 w-auto object-contain cursor-pointer'
                        onClick={() => navigate('/')}
                    />
                </div>

                <div>
                    <a href="about"
                        className='font-medium text-gray-800 hover:text-[#3549A0] cursor-pointer'
                    >
                        About
                    </a>
                </div>

                <div>
                    <button className='bg-[#3549A0] text-white px-6 py-2 rounded-md cursor-pointer'
                        onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header