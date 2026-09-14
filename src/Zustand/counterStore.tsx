import React from "react";
import { useCounterStore } from "../Store/counterStore";

const CounterStore = () => {
    const count = useCounterStore((state) => state.count);
    const increase = useCounterStore((state) => state.increase);
    const decrease = useCounterStore((state) => state.decrease);
    const reset = useCounterStore((state) => state.reset);

    return (
        <div className="mb-15 mt-15 text-center">
            <h1 className="text-xl font-bold">
                Counter Store
            </h1>

            <h2 className="my-5 text-3xl font-bold">
                {count}
            </h2>

            <div className="flex justify-center gap-3">
                <button
                    onClick={increase}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    +
                </button>

                <button
                    onClick={decrease}
                    className="rounded bg-red-500 px-4 py-2 text-white"
                >
                    -
                </button>

                <button
                    onClick={reset}
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CounterStore;