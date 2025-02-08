import React, { useState, useEffect } from 'react';
import { getGeminiResponse, getInitialRPGPrompt } from "./network/geminiApi";
import StoryBox from './ui/Storybox';
import OptionsBox from './ui/Optionsbox';
import CustomResponse from './ui/CustomResponse';
import './DungeonMaster.css';

function DungeonMaster() {
    const [response, setResponse] = useState("Welcome Adventurers...");
    const [initialResponseLoaded, setInitialResponseLoaded] = useState(false);
    const [choices, setChoices] = useState([]);
    const [customInput, setCustomInput] = useState(""); // State for custom input

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

    const handleCustomResponseSubmit = async () => {
        if (!customInput) return;

        const aiResponse = await getGeminiResponse(customInput);
        setResponse(aiResponse.text);
        setChoices(aiResponse.choices);
        setCustomInput("");
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
            <StoryBox text={response} />
            <OptionsBox choices={choices} onChoiceClick={handleChoiceClick} />
            <CustomResponse input={customInput} setInput={setCustomInput} onSubmit={handleCustomResponseSubmit} />
        </div>
    );
}

export default DungeonMaster;