import { useState } from "react";

const BooleanState = () => {

    const [showMessage, setShowMessage] = useState<boolean>(false);

    return (
        <div>
            <div className="mb-8 mt-15 text-center font-bold text-2xl">
                Boolean State Pratice
            </div>

            <div className="flex flex-col items-center gap-6">
                <button className=" px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all cursor-pointer"
                    onClick={() => setShowMessage(!showMessage)}>
                    Show/Hide
                </button>

                {showMessage && (
                    <p className="text-lg font-semibold">
                        Nivesh
                    </p>
                )}

            </div>
        </div>
    );
};

export default BooleanState