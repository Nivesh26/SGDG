import React from "react";
import { FaIdCard, FaRocket, FaQuoteLeft, FaUser, FaShoppingBag, FaMicrophone } from "react-icons/fa";


const FeatureCards = () => {
    return (
        <div className="mb-15">
            <div className="text-center mb-6">
                <p className='font-bold text-xl mb-1'>Feature Cards</p>
            </div>

            <div className=" gap-4 max-w-4xl mx-auto grid grid-cols-3">

                <div className="w-64 border border-gray-200 rounded-lg p-6 text-center shadow-md">
                    <FaRocket className="text-3xl text-black mx-auto mb-4" />

                    <p className="font-bold text-lg mb-2">
                        Fast & Easy
                    </p>

                    <p className="text-gray-500 text-sm">
                        Get started quickly and easily with our platform.
                    </p>
                </div>

                <div className="w-64 border border-gray-200 rounded-lg p-6 text-center shadow-md">
                    <FaIdCard className="text-3xl text-black mx-auto mb-4" />

                    <p className="font-bold text-lg mb-2">
                        ID Badge Card
                    </p>

                    <p className="text-gray-500 text-sm">
                        Shows verification status, employee/student ID number.
                    </p>
                </div>

                <div className="w-64 border border-gray-200 rounded-lg p-6 text-center shadow-md">
                    <FaQuoteLeft className="text-3xl text-black mx-auto mb-4" />

                    <p className="font-bold text-lg mb-2">
                        Business Card
                    </p>

                    <p className="text-gray-500 text-sm">
                        Pairs a customer's face portrait with a star rating, quote, and company.
                    </p>

                </div>

                <div className="w-64 border border-gray-200 rounded-lg p-6 text-center shadow-md">
                    <FaMicrophone className="text-3xl text-black mx-auto mb-4" />

                    <p className="font-bold text-lg mb-2">
                        Speaker
                    </p>

                    <p className="text-gray-500 text-sm">
                        Highlights conference or webinar presenters.
                    </p>
                </div>

                <div className="w-64 border border-gray-200 rounded-lg p-6 text-center shadow-md">
                    <FaShoppingBag className="text-3xl text-black mx-auto mb-4" />

                    <p className="font-bold text-lg mb-2">
                        Vendor Store
                    </p>

                    <p className="text-gray-500 text-sm">
                        Built for e-commerce marketplaces.
                    </p>
                </div>

                <div className="w-64 border border-gray-200 rounded-lg p-6 text-center shadow-md">
                    <FaUser className="text-3xl text-black mx-auto mb-4" />

                    <p className="font-bold text-lg mb-2">
                        Recruiter
                    </p>

                    <p className="text-gray-500 text-sm">
                        For showcasing job openings and candidate profiles.
                    </p>
                </div>


            </div>
        </div >
    )
}

export default FeatureCards;