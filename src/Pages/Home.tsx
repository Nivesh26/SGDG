import React from 'react'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import UseState from '../Hooks/UseState'
import StringState from '../Hooks/StringState'
import BooleanState from '../Hooks/BooleanState'
import PasswordInput from '../Hooks/PasswordInput'
import ObjectState from '../Hooks/ObjectState'
import ArrayState from '../Hooks/ArrayState'

const Home = () => {
    return (
        <div>
            <Header />
            {/* <Hero /> */}
            <UseState />
            <StringState />
            <BooleanState />
            <PasswordInput />
            <ObjectState />
            <ArrayState />
        </div>
    )
}

export default Home