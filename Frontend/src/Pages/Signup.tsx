import React from 'react'
import SignupForm from '../Components/SignupForm'
import Header from '../Components/Header'
import SignupFormZOD from '../Components/SignupFormZOD'


const Signup = () => {
    return (
        <div>
            <Header />
            {/* <SignupForm /> */}
            <SignupFormZOD />
        </div>
    )
}

export default Signup