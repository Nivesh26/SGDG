import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google.png'

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
}

const Form = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone Number is required";
        }
        //  else if (!/^\d{10}$/.test(formData.phone)) {
        //     newErrors.phone = "Phone Number must be exactly 10 digits";
        // }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            navigate("/");
        }
    };

    return (
        <div className='border border-gray-200 rounded-lg p-8 shadow-md w-fit mx-auto mb-15 mt-15'>

            <div className='mb-6 text-center'>
                <h1 className='font-bold text-xl mb-1'>Sign Up</h1>
                <p className='text-gray-500'>Sign up to continue</p>
            </div>


            <form className='flex flex-col gap-5 items-center' onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                    />

                    {errors.name && (<p className='text-red-500 text-sm mt-1'>{errors.name}</p>)}
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                    />

                    {errors.email && (<p className='text-red-500 text-sm mt-1'>{errors.email}</p>)}
                </div>

                <div>
                    <input
                        type="number"
                        placeholder="Phone Number"
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                    />

                    {errors.phone && (<p className='text-red-500 text-sm mt-1'>{errors.phone}</p>)}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                    />
                    {errors.password && (<p className='text-red-500 text-sm mt-1'>{errors.password}</p>)}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className='border border-gray-300 rounded-md px-2 py-1 w-100 h-10'
                    />

                    {errors.confirmPassword && (<p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>)}
                </div>

                <button
                    className='bg-[#3549A0] text-white px-2 py-1 w-100 h-10 rounded-md cursor-pointer mt-2'
                    type='submit'
                >
                    Sign Up
                </button>

                <button
                    className='px-2 py-1 w-100 h-10 rounded-md mt-2 border border-gray-300 shadow-md cursor-not-allowed flex items-center justify-center gap-2'
                    type='button'>
                    <img src={googleLogo}
                        alt="google"
                        className='w-5 h-5' />

                    Continue With Google

                </button>

            </form>
        </div >
    )
}

export default Form