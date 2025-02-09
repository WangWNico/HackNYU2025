import React, { useState, useEffect } from 'react';
import { getGeminiResponse, getInitialRPGPrompt } from "./network/geminiApi";
import StoryBox from './ui/Storybox';
import OptionsBox from './ui/Optionsbox';
import CustomResponse from './ui/CustomResponse';
import DiceRoll from './ui/DiceRoll';
import './DungeonMaster.css';

function DungeonMaster() {
    const [response, setResponse] = useState("Welcome Adventurers...");
    const [initialResponseLoaded, setInitialResponseLoaded] = useState(false);
    const [choices, setChoices] = useState([]);
    const [customInput, setCustomInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [diceRollValue, setDiceRollValue] = useState(null);

    useEffect(() => {
        const loadInitialResponse = async () => {
            setIsLoading(true);
            try {
                const initialData = await getInitialRPGPrompt();
                setResponse(initialData.text);
                setChoices(initialData.choices);
            } finally {
                setIsLoading(false);
                setInitialResponseLoaded(true);
            }
        };

        loadInitialResponse();
    }, [initialResponseLoaded]);

    const handleChoiceClick = async (choice) => {
        setIsLoading(true);
        try {
            const aiResponse = await getGeminiResponse(choice.description);
            setResponse(aiResponse.text);
            setChoices(aiResponse.choices);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCustomResponseSubmit = async () => {
        if (!customInput) return;

        const aiResponse = await getGeminiResponse(customInput);
        setResponse(aiResponse.text);
        setChoices(aiResponse.choices);
        setCustomInput("");
    };

    const handleDiceRoll = (result) => {
        setDiceRollValue(result);
        console.log("Dice rolled:", result);
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
            <StoryBox text={response} />
            <OptionsBox choices={choices} onChoiceClick={handleChoiceClick} />
            <CustomResponse input={customInput} setInput={setCustomInput} onSubmit={handleCustomResponseSubmit} />
            <DiceRoll onRoll={handleDiceRoll} />
        </div>
    );
}

export default DungeonMaster;