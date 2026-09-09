import { useState } from "react";

const ArrayState = () => {

    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<string[]>([]);

    const addTodo = () => {
        if (todo.trim() === "") return;

        setTodos([
            ...todos,
            todo
        ]);

        setTodo("");
    };

    return (
        <div>
            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                Array State Practice
            </div>

            <div className="flex flex-col items-center gap-6">

                <div className="flex gap-2">

                    <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="Enter your todo"
                        className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                    />

                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all cursor-pointer"
                    >
                        + Add Todo
                    </button>

                </div>

                <div>
                    {todos.map((todo, index) => (
                        <p key={index} className="text-lg">
                            {index + 1}. {todo}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ArrayState;