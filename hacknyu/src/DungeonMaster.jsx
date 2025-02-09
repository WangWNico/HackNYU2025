import React, { useState, useEffect } from 'react';
import { getGeminiResponse, getInitialRPGPrompt } from "./network/geminiApi";
import StoryBox from './ui/Storybox';
import OptionsBox from './ui/Optionsbox';
import CustomResponse from './ui/CustomResponse';
import DiceRoll from './ui/DiceRoll';
import './DungeonMaster.css';
import Statbox from './ui/Statbox';
import Robot from './assets/Robot.png';

function DungeonMaster() {
    const [response, setResponse] = useState("Welcome Adventurers...");
    const [initialResponseLoaded, setInitialResponseLoaded] = useState(false);
    const [choices, setChoices] = useState([]);
    const [customInput, setCustomInput] = useState("");
    const [requiresDiceRoll, setRequiresDiceRoll] = useState(false);
    const [currentChoice, setCurrentChoice] = useState(null);
    const [diceRollValue, setDiceRollValue] = useState(null); // Store dice roll value
    const [isLoading, setIsLoading] = useState(false);
    const [showDiceResult, setShowDiceResult] = useState(false);
    const [userStats, setUserStats]= useState([]);


    useEffect(() => {
        const loadInitialResponse = async () => {
            setIsLoading(true);
            try {
                const initialData = await getInitialRPGPrompt();
                setResponse(initialData.narration);
                setChoices(initialData.choices);
                setUserStats(initialData.userStats);
            } finally {
                setIsLoading(false);
                setInitialResponseLoaded(true);
            }
        };
        loadInitialResponse();
    }, []);

    const handleChoiceClick = (choice) => {
        const needsRoll = choice.description.includes("(requires a dice roll");

        if (needsRoll) {
            setRequiresDiceRoll(true);
            setCurrentChoice(choice);
            setShowDiceResult(false);
        } else {
            callGemini(choice.description);
        }
    };

    const callGemini = async (input, roll) => {
        setIsLoading(true);

        try {
            const aiResponse = await getGeminiResponse(input, roll);
            
            setResponse(aiResponse.narration);
            setChoices(aiResponse.choices);
            setUserStats(aiResponse.userStats);

            const nextChoicesNeedRoll = aiResponse.choices.some(c => c.description.includes("(requires a dice roll"));
            setRequiresDiceRoll(nextChoicesNeedRoll);

            setShowDiceResult(true);

            setTimeout(() => {
                setIsLoading(false);
                setCurrentChoice(null);
                setDiceRollValue(null);
            }, 1000);
    
        } catch (error) {
            console.error("Error calling Gemini:", error);
            // Handle error appropriately (e.g., display an error message)
            setIsLoading(false); // Stop loading even if there's an error
            setCurrentChoice(null);
            setDiceRollValue(null);
        }
    };

    const handleCustomResponseSubmit = async () => {
        if (!customInput) return;

        const aiResponse = await getGeminiResponse(customInput);
        setResponse(aiResponse.narration);
        setChoices(aiResponse.choices);
        setUserStats(aiResponse.userStats);
        setCustomInput("");
    };

    const handleDiceRoll = (result) => {
        setDiceRollValue(result);
        setRequiresDiceRoll(false);
        callGemini(currentChoice.description, result);
        setTimeout(() => {
            setRequiresDiceRoll(false); // Hide the DiceRoll component after the delay
        }, 3000);
    };

    return (
        <>
        <div className="container">
            <h1> <img src={Robot} className="robot"/> Stupid Adventures Using ChatBot's Yarns </h1>
            <Statbox stats={userStats} />
            <StoryBox text={response} isLoading={isLoading} />
            {isLoading ? (
                <div className="loading-bar">Loading...</div>
            ) : (
                <>
                
                    <OptionsBox choices={choices} onChoiceClick={handleChoiceClick} />
                    <div className= "diceCon">
                    {requiresDiceRoll && <DiceRoll onRoll={handleDiceRoll} />}
                    </div>
                    <CustomResponse input={customInput} setInput={setCustomInput} onSubmit={handleCustomResponseSubmit} />
                    
                </>
            )}
        </div>
        </>
    );
}

export default DungeonMaster;