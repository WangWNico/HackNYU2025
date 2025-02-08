import React, { useState, useEffect } from 'react';
import { getGeminiResponse, getInitialRPGPrompt } from "./network/geminiApi";
import StoryBox from './ui/Storybox';
import OptionsBox from './ui/Optionsbox';
import './DungeonMaster.css';

function DungeonMaster() { // Renamed for clarity
    const [response, setResponse] = useState("Welcome Adventurers..."); // Initial text
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

        const aiResponse = await getGeminiResponse(choice.description);
        setResponse(aiResponse.text);
        setChoices(aiResponse.choices);
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
            <StoryBox text={response} /> {/* Pass response to StoryBox as prop */}
            <OptionsBox choices={choices} onChoiceClick={handleChoiceClick} /> {/* Pass choices and click handler */}
        </div>
    );
}

export default DungeonMaster;