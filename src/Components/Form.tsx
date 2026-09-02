import React from 'react';

const Form = () => {
    return (
        <div className='border border-gray-200 rounded-lg p-8 shadow-md w-fit mx-auto'>

            <div className='mb-6 text-center'>
                <h1 className='font-bold text-xl mb-1'>Sign Up</h1>
                <p className='text-gray-500'>Sign up to continue</p>
            </div>

            <div className='flex flex-col gap-5 items-center'>
                <input
                    type="text"
                    placeholder="Full Name"
                    className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                >
                </input>

                <input
                    type="email"
                    placeholder="Email"
                    className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                >
                </input>

                <input
                    type="number"
                    placeholder="Phone Number"
                    className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                >
                </input>

                <input
                    type="password"
                    placeholder="Password"
                    className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                >
                </input>

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                >
                </input>

                <button className='bg-[#3549A0] text-white px-2 py-1 w-100 h-10 rounded-md cursor-pointer mt-2'>
                    Sign Up
                </button>
            </div>

        </div >
    )
}

export default Form