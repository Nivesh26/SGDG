import { useState } from 'react';

const UseState = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <div className="mb-8 mt-8 text-center font-bold text-2xl">
                UseState
            </div>

            <div className="flex flex-col items-center gap-6 text-center justify-center">
                <h1 className="text-xl font-semibold">Count: {count}</h1>

                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-sm hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                        onClick={() => setCount(count + 1)}>
                        + Increase
                    </button>

                    <button
                        className="px-4 py-2 bg-rose-600 text-white font-medium rounded-lg shadow-sm hover:bg-rose-700 active:scale-95 transition-all cursor-pointer"
                        onClick={() => setCount(count - 1)}>
                        - Decrease
                    </button>

                    <button
                        className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow-sm hover:bg-gray-600 active:scale-95 transition-all cursor-pointer"
                        onClick={() => setCount(0)}>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UseState;