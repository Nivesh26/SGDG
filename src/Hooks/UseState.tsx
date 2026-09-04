import { useState } from 'react';

const UseState = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <div className="mb-15 mt-15 text-center font-bold text-xl">
                UseState
            </div>

            <div className="flex flex-col items-center gap-4 text-center justify-center">
                <h1>Count: {count}</h1>

                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600"
                        onClick={() => setCount(count + 1)}>
                        + Increase
                    </button>

                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
                        onClick={() => setCount(count - 1)}>
                        - Decrease
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UseState