import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/google.png";

// 1. Create Zod schema
const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});

// 2. Get TypeScript type from Zod schema
type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: ""
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

        const result = loginSchema.safeParse(formData);

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

        // Validation successful - clear errors & navigate to home page /
        setErrors({});
        navigate("/");
    };

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

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
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

                <button
                    type="submit"
                    className="bg-[#3549A0] text-white px-2 py-1 w-100 h-10 rounded-md cursor-pointer mt-2"
                >
                    Login
                </button>

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

export default LoginForm;