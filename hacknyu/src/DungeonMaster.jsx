import { useState } from "react";
import { fetchGeminiResponse } from "./network/geminiApi";

function DungeonMaster() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleGenerate = async () => {
        const result = await fetchGeminiResponse(input);
        setResponse(result);
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your action..." />
            <button onClick={handleGenerate}>Generate</button>
            <p>{response}</p>
        </div>
    );
}

export default DungeonMaster;
