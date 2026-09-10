import { useState } from "react";

interface Todo {
    id: number;
    title: string;
}

const ArrayEdit = () => {

    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const addTodo = () => {
        if (todo.trim() === "") return;

        const newTodo: Todo = {
            id: Date.now(),
            title: todo.trim(),
        };

        setTodos([...todos, newTodo]);

        setTodo("");
    };

    const editTodo = (id: number) => {

        const selectedTodo = todos.find(
            (todo) => todo.id === id
        );

        if (!selectedTodo) return;

        setTodo(selectedTodo.title);

        setEditingId(id);
    };

    const updateTodo = () => {

        if (todo.trim() === "") return;

        setTodos(
            todos.map((item) =>
                item.id === editingId
                    ? {
                        ...item,
                        title: todo.trim()
                    }
                    : item
            )
        );

        setTodo("");
        setEditingId(null);
    };


    return (
        <div>
            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                Array Edit Pratice
            </div>

            <div className="flex justify-center gap-2">

                <input
                    type="text"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Enter your todo"
                    className="w-80 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-500"
                />


                {editingId === null ? (

                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                    >
                        + Add Todo
                    </button>

                ) : (

                    <button
                        onClick={updateTodo}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                    >
                        Update Todo
                    </button>

                )}

            </div>

            <div className="w-96 mx-auto mt-6 flex flex-col gap-3">

                {todos.map((todo, index) => (

                    <div
                        key={todo.id}
                        className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3"
                    >

                        <p>
                            {index + 1}. {todo.title}
                        </p>

                        <button
                            onClick={() => editTodo(todo.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer"
                        >
                            Edit
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ArrayEdit;