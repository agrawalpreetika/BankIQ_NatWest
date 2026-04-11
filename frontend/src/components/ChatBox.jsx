import { useState } from "react";

export default function ChatBox({ onAsk }) {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (!input) return;
        onAsk(input);
        setInput("");
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                className="flex-1 p-3 border rounded-lg"
                placeholder="Ask something like 'Revenue by region'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 rounded-lg"
            >
                Ask
            </button>
        </div>
    );
}