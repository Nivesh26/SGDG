import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import googleLogo from "../assets/google.png";

// 1. Create Zod schema
const formSchema = z.object({
    name: z
        .string()
        .min(1, "Full Name is required"),

    email: z
        .string()
        .email("Enter a valid email address"),

    phone: z
        .string()
        .regex(/^\d{10}$/, "Phone Number must be exactly 10 digits"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password")
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
);

// 2. Get TypeScript type from Zod schema
type FormData = z.infer<typeof formSchema>;

const FormZOD = () => {

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof FormData, string>>
    >({});

    // 3. Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Remove error when user starts typing
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    // 4. Handle form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = formSchema.safeParse(formData);

        if (!result.success) {

            const newErrors: Partial<Record<keyof FormData, string>> = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FormData;

                if (!newErrors[field]) {
                    newErrors[field] = issue.message;
                }
            });

            setErrors(newErrors);
            return;
        }

        // Validation successful
        console.log("Form is valid:", result.data);

        setErrors({});
    };

    return (
        <div className="border border-gray-200 rounded-lg p-8 shadow-md w-fit mx-auto mt-15 mb-15">

            {/* Heading */}
            <div className="text-center mb-6">
                <h1 className="font-bold text-xl mb-1">
                    Sign Up
                </h1>

                <p className="text-gray-500">
                    Already Have An Account?
                    <Link to="/login" className="text-blue-500 ml-2 underline font-bold" >
                        Login
                    </Link>
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 items-center"
            >

                {/* Name */}
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric"
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />

                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-2 py-1 w-100 h-10"
                    />

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Sign Up */}
                <button
                    type="submit"
                    className="bg-[#3549A0] text-white px-2 py-1 w-100 h-10 rounded-md cursor-pointer mt-2"
                >
                    Sign Up
                </button>

                {/* Google */}
                <button
                    type="button"
                    className="px-2 py-1 w-100 h-10 rounded-md border border-gray-300 shadow-md flex items-center justify-center gap-2 cursor-not-allowed"
                >
                    <img
                        src={googleLogo}
                        alt="Google"
                        className="w-5 h-5"
                    />

                    Continue With Google
                </button>

            </form>
        </div>
    );
};

export default FormZOD;