import React from "react";
import Header from "../Components/Header";
import ObjectState from "../Hooks/ObjectState";
import ArrayState from "../Hooks/ArrayState";
import ArrayDelete from "../Hooks/ArrayDelete";
import ArrayEdit from "../Hooks/ArrayEdit";
import UseReducer from "../Hooks/UseReducer";

const Todos = () => {
    return (
        <div>
            <Header />
            <div className="mb-15 mt-15 text-center font-bold text-xl">Todos</div>
            <ObjectState />
            <ArrayState />
            <ArrayDelete />
            <ArrayEdit />
            <UseReducer />
        </div>
    )
}

export default Todos
