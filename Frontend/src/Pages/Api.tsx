import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
}

const Api = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("src/API/users.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((data: User[]) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="mb-10 mt-15 text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    API Users
                </h1>
                <p className="mt-2 text-gray-500">
                    Manage and view all users
                </p>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-10">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Users List
                        </h2>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            {users.length} Users
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left text-sm">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                                <tr>
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Location</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-500">
                                            #{user.id}
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {user.phone}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                {user.location}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Api;

