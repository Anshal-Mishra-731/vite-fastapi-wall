import { useState } from "react";

function RightCanvas() {
    const [query, setQuery] = useState("");

    return (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-black border-l border-zinc-800 px-6 py-4">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-zinc-900 text-white placeholder-zinc-400 px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                {query && (
                    <div className="absolute mt-2 w-full bg-black border border-zinc-800 rounded-xl shadow-xl p-4 text-zinc-400">
                        Searching for "{query}"...
                    </div>
                )}
            </div>

        </div>
    );
}

export default RightCanvas;