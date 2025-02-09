import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
let conversationHistory = "";

export const getGeminiResponse = async (userInput) => { 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const prompt = `${conversationHistory}\n\nYou: ${userInput}\n\nContinue the adventure.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        console.log(text);
        
        const choices = parseChoices(text);
        const narration = parseNarration(text);
        const userStats = parseStats(text);
        console.log(narration);

        conversationHistory += `${prompt}\n${text}\n`;

        return { narration, choices, userStats };
    } catch (error) {
        console.error("Error getting Gemini response:", error);
        return { text: "Error getting response from AI.", choices: [] };
    }
};


export const getInitialRPGPrompt = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const initialPrompt = `You are a Dungeon Master guiding an interactive text-based RPG adventure. 

Your role is to describe the world, set the scene, narrate events dynamically, and guide the player through an immersive journey. 

### **Rules for Responses:**  
1. **Storytelling:** Start with a vivid, engaging scene that describes the environment, characters, and situation.  
2. **Choices:** Always provide exactly **three** distinct choices for the player to continue the story. These should be meaningful and impact the storyline.  
3. **Game Mechanics:**  
   - If the player encounters an enemy, describe the encounter and offer strategic choices (e.g., fight, negotiate, or flee).  
   - If the player searches an area, provide randomized loot, traps, or surprises.  
   - If magic is involved, describe effects in a fantasy-driven manner.
   -Initial Stats are loaded upon start, and then is affected only through choice outcomes, like combat.
4. **Format of Response:**  
   - Narration: { Describe the current situation in at most 5 sentences. }
   - Choices: { Provide three numbered options for the player. }
   -Initial Stats: {Provide 3 stats, each randomized from 1-10: hp, attack, speed }
   - **Example Output:**  
     \`\`\`
     Narration: { As you enter the ancient ruins, the air is thick with the scent of moss and decay. A faint glow pulses from deep within the shadows.  
     Suddenly, you hear a growl behind you. A large, hooded figure steps forward, gripping a rusted blade. 
     What do you do? }
     
     Choices: { 1. Draw your sword and prepare to fight.
     2. Attempt to reason with the figure, offering a trade.
     3. Run towards the glowing light, hoping to escape. }

     Stats: {
     hp: 8,
     attack:3,
     speed:9
     }

     \`\`\`

### **Gameplay Flow:**  
- Wait for the player’s response.  
- Continue the story based on their choice, making sure each decision affects future events.  
- Keep the story engaging, adventurous, and full of surprises.  

**Begin the adventure now! Start by introducing the setting.**  
`;
    try {
        const result = await model.generateContent(initialPrompt);
        const response = await result.response;
        let text = response.text();
        //console.log(text);
        const narration = parseNarration(text);
        const choices = parseChoices(text);
        const userStats = parseStats(text);

        conversationHistory += `${initialPrompt}\n${text}\n`;

        return { narration, choices, userStats };
    } catch (error) {
        console.error("Error generating initial prompt:", error);
        return { text: "Error generating initial prompt.", choices: [] };
    }
};

function parseNarration(responseText) {
    // Match the narration text, even if it spans multiple lines
    const narrationMatch = responseText.match(/Narration:\s*\{([\s\S]*?)\}/);

    if (narrationMatch && narrationMatch[1]) {
        return narrationMatch[1].trim();
    }

    // Fallback: If the regex doesn't match, return a default message
    return "No narration found.";
}

function parseChoices(responseText) {
    const choicesMatch = responseText.match(/Choices:\s*([\s\S]*?)\}/);
    if (!choicesMatch) return [];

    const choicesText = choicesMatch[1];
    const choices = [];
    const choiceRegex = /(\d+\.|[1-3]\.|[1-3]\)|[1-3]️⃣|\[\d+\])\s(.+?)(?=(\d+\.|[1-3]\.|[1-3]\)|[1-3]️⃣|\[\d+\]|$))/gs; // More robust choice regex
    let match;
    while ((match = choiceRegex.exec(choicesText)) !== null) {
        choices.push({ number: match[1].trim(), description: match[2].trim() });
    }
    return choices;
}
function parseStats(responseText) {
    const statMatch = responseText.match(/Stats:\s*{([\s\S]*?)}/);
    console.log(statMatch);
    if (statMatch && statMatch[1]) {
        const statsArray = statMatch[1].trim().split(/\s*,\s*/);
        
        // This will give you an array like: ["hp: 8", "attack:3", "speed:9"]
        console.log(statsArray);
        return statsArray;
    }
    
    return [];
}
