import { useState } from "react";


const StringState = () => {
    const [name, setName] = useState<string>("");


    return (
        <div>
            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                UseState Pratice
            </div>

            <div className="mt-10 flex flex-col items-center gap-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none"
                />
                <h2 className="text-xl font-semibold">
                    Hello,{name}
                </h2>
            </div>

        </div>
    )
}


export default StringState