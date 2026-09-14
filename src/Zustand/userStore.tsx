import React, { useState } from "react";
import { useUserStore } from "../Store/userStore";

const UserStore = () => {
    const user = useUserStore((state) => state.user);

    const setName = useUserStore((state) => state.setName);
    const setEmail = useUserStore((state) => state.setEmail);
    const setAge = useUserStore((state) => state.setAge);
    const resetUser = useUserStore((state) => state.resetUser);

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [ageInput, setAgeInput] = useState("");

    const handleUpdate = () => {
        if (nameInput.trim() !== "") {
            setName(nameInput);
        }

        if (emailInput.trim() !== "") {
            setEmail(emailInput);
        }

        if (ageInput.trim() !== "") {
            setAge(Number(ageInput));
        }

        setNameInput("");
        setEmailInput("");
        setAgeInput("");
    };

    return (
        <div className="mb-15 mt-15 text-center">
            <h1 className="mb-5 text-2xl font-bold">
                User Store
            </h1>

            <div className="mb-5">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="rounded border px-3 py-2"
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="rounded border px-3 py-2"
                />

                <input
                    type="number"
                    placeholder="Enter your age"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    className="rounded border px-3 py-2"
                />

                <div className="flex gap-3">
                    <button
                        onClick={handleUpdate}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Update User
                    </button>

                    <button
                        onClick={resetUser}
                        className="rounded bg-gray-500 px-4 py-2 text-white"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserStore;