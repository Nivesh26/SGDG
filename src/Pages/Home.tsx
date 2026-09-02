import React from 'react'
import Form from '../Components/Form'
import FeatureCards from '../Components/FeatureCards'
import sgdgLogo from '../assets/sgdg.jpeg'

const Home = () => {
    return (
        <div className="flex flex-col">
            <img src={sgdgLogo} alt="SGDG Logo" className="h-34 w-auto object-contain" />

            <Form />
            <FeatureCards />
        </div>
    )
}

export default Home