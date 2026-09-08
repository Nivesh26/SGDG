import { useState } from "react";

interface User {
    name: string;
    email: string;
    age: number;
}

const ObjectState = () => {

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        age: 0,
    });

    return (
        <div>
            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                Object State Pratice
            </div>

            <div className="flex flex-col items-center gap-4" >
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="border rounded-lg px-4 py-2"
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="border rounded-lg px-4 py-2"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Enter age"
                    value={user.age}
                    onChange={(e) =>
                        setUser({
                            ...user,
                            age: Number(e.target.value),
                        })
                    }
                    className="border rounded-lg px-4 py-2"
                />

            </div>


        </div>
    );
};

export default ObjectState;