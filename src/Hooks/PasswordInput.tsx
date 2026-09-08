import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div>
            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                Password Input Pratice
            </div>

            <div className="flex justify-center items-center gap-2 " >
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="border rounded-lg px-4 py-2"
                />

                <button onClick={() => setShowPassword(!showPassword)}
                    className={`px-4 py-2 text-white font-medium rounded-lg transition-all cursor-pointer ${showPassword
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-red-600 hover:bg-red-700"
                        }`}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

            </div>

        </div>
    )
}

export default PasswordInput