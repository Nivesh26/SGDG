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
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

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

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSearchQuery(searchInput.trim());
    };

    const handleClear = () => {
        setSearchInput("");
        setSearchQuery("");
    };

    const filteredUsers = users.filter((user) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query) ||
            user.location.toLowerCase().includes(query) ||
            user.id.toString().includes(query)
        );
    });

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
                    <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Users List
                            </h2>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                {filteredUsers.length} {filteredUsers.length === 1 ? "User" : "Users"}
                                {searchQuery && ` of ${users.length}`}
                            </span>
                        </div>

                        <form
                            onSubmit={handleSearch}
                            className="flex flex-wrap items-center gap-2"
                        >
                            <div className="relative flex-1 sm:w-72">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search by name, email, location..."
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 shadow-xs placeholder:text-gray-400 focus:border-[#3549A0] focus:outline-none focus:ring-1 focus:ring-[#3549A0]"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-[#3549A0] px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-[#2b3c85] focus:outline-none focus:ring-2 focus:ring-[#3549A0] focus:ring-offset-1"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                Search
                            </button>

                            {(searchInput || searchQuery) && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                >
                                    Clear
                                </button>
                            )}
                        </form>
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
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            <p className="text-base font-semibold text-gray-700">
                                                No users found
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {searchQuery
                                                    ? `No results match "${searchQuery}".`
                                                    : "No users available."}
                                            </p>
                                            {searchQuery && (
                                                <button
                                                    type="button"
                                                    onClick={handleClear}
                                                    className="mt-3 inline-block text-sm font-medium text-[#3549A0] hover:underline cursor-pointer"
                                                >
                                                    Reset search
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-500">
                                                {user.id}
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Api;

