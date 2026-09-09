import React, { useReducer } from "react";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface State {
    count: number;
    todos: Todo[];
}

type Action =
    | { type: "INCREASE"; payload: number }
    | { type: "DECREASE"; payload: number }
    | { type: "RESET_COUNT" }
    | { type: "ADD_TODO"; payload: string }
    | { type: "DELETE_TODO"; payload: number }
    | { type: "EDIT_TODO"; payload: { id: number; title: string } }
    | { type: "TOGGLE_TODO"; payload: number }
    | { type: "CLEAR_TODOS" };


const initialState: State = {
    count: 0,
    todos: [],
};


const reducer = (state: State, action: Action): State => {

    switch (action.type) {

        // COUNTER
        case "INCREASE":

            return {
                ...state,
                count: state.count + action.payload,
            };


        case "DECREASE":

            return {
                ...state,
                count: state.count - action.payload,
            };


        case "RESET_COUNT":

            return {
                ...state,
                count: 0,
            };


        // ADD TODO
        case "ADD_TODO":

            return {
                ...state,

                todos: [
                    ...state.todos,
                    {
                        id: Date.now(),
                        title: action.payload,
                        completed: false,
                    },
                ],
            };


        // DELETE TODO
        case "DELETE_TODO":

            return {
                ...state,

                todos: state.todos.filter(
                    (todo) => todo.id !== action.payload
                ),
            };


        // EDIT TODO
        case "EDIT_TODO":

            return {
                ...state,

                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? {
                            ...todo,
                            title: action.payload.title,
                        }
                        : todo
                ),
            };


        // COMPLETE TODO
        case "TOGGLE_TODO":

            return {
                ...state,

                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? {
                            ...todo,
                            completed: !todo.completed,
                        }
                        : todo
                ),
            };


        // CLEAR ALL
        case "CLEAR_TODOS":

            return {
                ...state,
                todos: [],
            };


        default:
            return state;
    }
};


const UseReducer = () => {

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    const [todo, setTodo] = React.useState("");

    const [editingId, setEditingId] = React.useState<number | null>(null);


    // ADD / UPDATE TODO
    const handleTodo = () => {

        if (todo.trim() === "") return;


        if (editingId !== null) {

            dispatch({
                type: "EDIT_TODO",
                payload: {
                    id: editingId,
                    title: todo.trim(),
                },
            });

            setEditingId(null);

        } else {

            dispatch({
                type: "ADD_TODO",
                payload: todo.trim(),
            });

        }

        setTodo("");
    };


    // EDIT BUTTON
    const editTodo = (id: number) => {

        const selectedTodo = state.todos.find(
            (todo) => todo.id === id
        );

        if (!selectedTodo) return;

        setTodo(selectedTodo.title);
        setEditingId(id);
    };


    return (
        <div>

            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                UseReducer Practice
            </div>


            {/* COUNTER */}

            <div className="flex flex-col items-center gap-4">

                <h2 className="text-xl font-bold">
                    Count: {state.count}
                </h2>

                <div className="flex gap-2">

                    <button
                        onClick={() =>
                            dispatch({
                                type: "INCREASE",
                                payload: 5,
                            })
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                    >
                        +5
                    </button>


                    <button
                        onClick={() =>
                            dispatch({
                                type: "DECREASE",
                                payload: 5,
                            })
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                    >
                        -5
                    </button>


                    <button
                        onClick={() =>
                            dispatch({
                                type: "RESET_COUNT",
                            })
                        }
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg cursor-pointer"
                    >
                        Reset
                    </button>

                </div>


                {/* TODO INPUT */}

                <div className="flex gap-2 mt-6">

                    <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="Enter todo"
                        className="w-80 border border-gray-300 rounded-lg px-4 py-2 outline-none"
                    />


                    <button
                        onClick={handleTodo}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
                    >
                        {editingId !== null ? "Update" : "Add"}
                    </button>

                </div>


                {/* TODO LIST */}

                <div className="w-96 flex flex-col gap-3 mt-4">

                    {state.todos.map((todo, index) => (

                        <div
                            key={todo.id}
                            className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3"
                        >

                            <div className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() =>
                                        dispatch({
                                            type: "TOGGLE_TODO",
                                            payload: todo.id,
                                        })
                                    }
                                />

                                <p
                                    className={
                                        todo.completed
                                            ? "line-through text-gray-400"
                                            : ""
                                    }
                                >
                                    {index + 1}. {todo.title}
                                </p>

                            </div>


                            <div className="flex gap-2">

                                <button
                                    onClick={() => editTodo(todo.id)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-lg cursor-pointer"
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "DELETE_TODO",
                                            payload: todo.id,
                                        })
                                    }
                                    className="px-3 py-1 bg-red-600 text-white rounded-lg cursor-pointer"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* CLEAR ALL */}

                {state.todos.length > 0 && (

                    <button
                        onClick={() =>
                            dispatch({
                                type: "CLEAR_TODOS",
                            })
                        }
                        className="mt-4 px-5 py-2 bg-red-700 text-white rounded-lg cursor-pointer"
                    >
                        Clear All
                    </button>

                )}

            </div>

        </div>
    );
};

export default UseReducer;