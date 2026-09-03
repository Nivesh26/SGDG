import React from 'react';
import logo from '../assets/sgdg.jpeg'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className='w-full px-8'>
            <nav className='h-24 flex items-center justify-between relative'>
                <div>
                    <img src={logo}
                        alt="SGDG Logo"
                        className='h-34 w-auto object-contain cursor-pointer'
                        onClick={() => navigate('/')}
                    />
                </div>

                <div className='absolute left-1/2 -translate-x-1/2 flex gap-8'>

                    <a href="about"
                        className='font-medium text-gray-800 hover:text-[#3549A0] cursor-pointer'
                    >
                        About
                    </a>

                    <a href="/project"
                        className='font-medium text-gray-800 hover:text-[#3549A0] cursor-pointer'
                    >
                        Projects
                    </a>

                    <a href="/services"
                        className='font-medium text-gray-800 hover:text-[#3549A0] cursor-pointer'
                    >
                        Services
                    </a>

                    <a href="/contact"
                        className='font-medium text-gray-800 hover:text-[#3549A0] cursor-pointer'
                    >
                        Contact Us
                    </a>

                </div>

                <div>
                    <button className='bg-[#3549A0] text-white hover:bg-green-800 px-6 py-2 rounded-md cursor-pointer '
                        onClick={() => navigate('/signup')}>
                        Login
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header