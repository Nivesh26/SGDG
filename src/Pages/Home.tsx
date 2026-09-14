import React from 'react'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import UseState from '../Hooks/UseState'
import StringState from '../Hooks/StringState'
import BooleanState from '../Hooks/BooleanState'
import PasswordInput from '../Hooks/PasswordInput'
import CounterStore from '../Zustand/counterStore'
import UserStore from '../Zustand/userStore'

const Home = () => {
    return (
        <div>
            <Header />
            {/* <Hero /> */}
            <UseState />
            <StringState />
            <BooleanState />
            <PasswordInput />
            <CounterStore />
            <UserStore />

        </div>
    )
}

export default Home