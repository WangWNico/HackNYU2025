import React, { useState, useEffect } from 'react';
import { getGeminiResponse, getInitialRPGPrompt } from "./network/geminiApi";
import StoryBox from './ui/Storybox';
import OptionsBox from './ui/Optionsbox';
import CustomResponse from './ui/CustomResponse';
import ProfileBox from './ui/Profilebox';
import './DungeonMaster.css';

function DungeonMaster() {
    const [response, setResponse] = useState("Welcome Adventurers...");
    const [initialResponseLoaded, setInitialResponseLoaded] = useState(false);
    const [choices, setChoices] = useState([]);
    const [customInput, setCustomInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [gender, setGender] = useState("default");

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

        if (initialResponseLoaded) {
            const randomGender = Math.random() < 0.5 ? "male" : "female";
            setGender(randomGender);
        }
        loadInitialResponse();
    }, [initialResponseLoaded]);

    const handleChoiceClick = async (choice) => {
        setIsLoading(true);
        try {
            const aiResponse = await getGeminiResponse(choice.description);
            if (choice.description.includes("male")) {
            setGender("male");
        } else if (choice.description.includes("female")) {
            setGender("female");
        }
        setResponse(aiResponse.text);
            setChoices(aiResponse.choices);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCustomResponseSubmit = async () => {
        if (!customInput || isLoading) return;
        setIsLoading(true);
        try {
            const aiResponse = await getGeminiResponse(customInput);
            setResponse(aiResponse.text);
            setChoices(aiResponse.choices);
            setCustomInput("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>AI Dungeon Master</h1>
            <ProfileBox gender={gender} />
            <StoryBox 
                text={response}
                isLoading={isLoading}
            />
        {isLoading ? (
            <div className="loading-spinner"></div>
        ) : (
            <>
                <OptionsBox 
                    choices={choices} 
                    onChoiceClick={handleChoiceClick} 
                />
                <CustomResponse 
                    input={customInput} 
                    setInput={setCustomInput} 
                    onSubmit={handleCustomResponseSubmit} 
                />
            </>
        )}    
        </div>
    );
}

export default DungeonMaster;