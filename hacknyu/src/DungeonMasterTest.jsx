import { useState, useEffect } from "react";
import { getGeminiResponse, getInitialRPGPrompt } from "./network/geminiApi";

function DungeonMasterTest() {
    const [response, setResponse] = useState("");
    const [initialResponseLoaded, setInitialResponseLoaded] = useState(false);
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        const loadInitialResponse = async () => {
            const initialData = await getInitialRPGPrompt();
            setResponse(initialData.text);
            setChoices(initialData.choices);
            setInitialResponseLoaded(true);
        };

        loadInitialResponse();
    }, []);

    const handleChoiceClick = async (choice) => {
        if (!initialResponseLoaded) return;

        const aiResponse = await getGeminiResponse(choice.description); // Send choice description
        setResponse(aiResponse.text); // Update with the new text
        setChoices(aiResponse.choices); // Update the choices for the next turn
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
            <p>{response}</p>
            {choices.length > 0 && (
                <div> {/* Wrap buttons in a div for better layout */}
                    {choices.map((choice) => (
                        <button key={choice.number} onClick={() => handleChoiceClick(choice)}>
                            {choice.number} {choice.description}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DungeonMasterTest;