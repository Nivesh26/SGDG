import React from "react";
import { create } from "zustand";

interface CounterStore {
    count: number;
    increase: () => void;
    decrease: () => void;
    reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
    count: 0,

    increase: () =>
        set((state) => ({
            count: state.count + 1,
        })),

    decrease: () =>
        set((state) => ({
            count: state.count - 1,
        })),

    reset: () =>
        set({
            count: 0,
        }),
}));

const CounterStore = () => {
    const count = useCounterStore((state) => state.count);
    const increase = useCounterStore((state) => state.increase);
    const decrease = useCounterStore((state) => state.decrease);
    const reset = useCounterStore((state) => state.reset);

    return (
        <div className="mb-15 mt-15 text-center font-bold text-xl">
            <h1>Counter Store</h1>

            <h2 className="my-5 text-3xl">{count}</h2>

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