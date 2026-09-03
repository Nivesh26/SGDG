import React from "react";
import { Link } from "react-router-dom";
import googleLogo from "../assets/google.png";

const LoginForm = () => {
    return (
        <div className="border border-gray-200 rounded-lg p-8 shadow-md w-fit mx-auto mt-15 mb-15">

            <div className="text-center mb-6">
                <h1 className="font-bold text-xl mb-1">Login</h1>
                <p className="text-gray-500">
                    Dont Have An Account?
                    <Link to="/signup" className="text-blue-500 ml-2 underline font-bold" >
                        Sign Up
                    </Link>
                </p>
            </div>

            <form className="flex flex-col gap-5 items-center">
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />
                </div>


                <button
                    // type="submit"
                    className="bg-[#3549A0] text-white px-2 py-1 w-100 h-10 rounded-md cursor-pointer mt-2"
                >
                    Login
                </button>

                <button
                    // type="button"
                    className="px-2 py-1 w-100 h-10 rounded-md  border border-gray-300 shadow-md flex items-center justify-center gap-2 cursor-not-allowed"
                >
                    <img
                        src={googleLogo}
                        alt="Google"
                        className="w-5 h-5"
                    />

                    Continue With Google
                </button>


            </form>

        </div >
    )
}

export default LoginForm