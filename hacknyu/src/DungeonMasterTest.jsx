import { useState } from "react";
// import { fetchGeminiResponse } from "./network/geminiApi";

function DungeonMasterTest() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleGenerate = async () => {
        const result = await fetchGeminiResponse(input);
        setResponse(result);
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
        </div>
    );
}

export default DungeonMasterTest;
