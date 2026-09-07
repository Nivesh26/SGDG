import { useState } from 'react';
import { FiPlus, FiMinus, FiRotateCcw } from 'react-icons/fi';

const UseState = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="py-12 px-4 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center transition-all">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400 rounded-full mb-4">
                    React Hook Demo
                </span>
                
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                    useState Counter
                </h2>

                {/* Counter Display */}
                <div className="my-6 py-6 px-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1">Current Value</span>
                    <span className={`text-5xl font-extrabold tracking-tight transition-all duration-300 ${
                        count > 0 ? 'text-emerald-600 dark:text-emerald-400' : count < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-100'
                    }`}>
                        {count}
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer"
                        onClick={() => setCount(count + 1)}>
                        <FiPlus className="w-5 h-5 stroke-[2.5]" />
                        <span>Increase</span>
                    </button>

                    <button
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer"
                        onClick={() => setCount(count - 1)}>
                        <FiMinus className="w-5 h-5 stroke-[2.5]" />
                        <span>Decrease</span>
                    </button>

                    <button
                        aria-label="Reset Count"
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer"
                        title="Reset Counter"
                        onClick={() => setCount(0)}>
                        <FiRotateCcw className="w-5 h-5 stroke-[2]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UseState;