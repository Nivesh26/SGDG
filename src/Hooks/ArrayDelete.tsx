import { useState } from "react";

const ArrayDelete = () => {

    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<string[]>([]);


    const addTodo = () => {
        if (todo.trim() === "") return;

        setTodos([
            ...todos,
            todo.trim()
        ]);

        setTodo("");
    };

    const deleteTodo = (indexToDelete: number) => {
        setTodos(
            todos.filter((_, index) => index !== indexToDelete)
        );
    };

    return (

        <div>


            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                Array Delete Practice
            </div>

            <div className="flex flex-col items-center gap-6">


                <div className="flex gap-2">

                    <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="Enter your todo"
                        className="w-80 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-500"
                    />

                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all cursor-pointer"
                    >
                        + Add Todo
                    </button>

                </div>

                <div className="w-96 flex flex-col gap-3">

                    {todos.map((todo, index) => (

                        <div
                            key={index}
                            className="flex items-center justify-between gap-4 border border-gray-300 rounded-lg px-4 py-3"
                        >

                            <p className="text-lg font-medium">
                                {index + 1}. {todo}
                            </p>

                            <button
                                onClick={() => deleteTodo(index)}
                                className="shrink-0 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all cursor-pointer"
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default ArrayDelete;