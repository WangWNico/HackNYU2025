import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
// console.log(import.meta.env.VITE_API_KEY);
let conversationHistory = "";

export const getGeminiResponse = async (userInput) => { // Renamed and now takes input
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const prompt = `${conversationHistory}\n\nYou: ${userInput}\n\nContinue the adventure.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        const choices = parseChoices(text);

        text = trimChoicesFromText(text, choices);

        conversationHistory += `${prompt}\n${text}\n`;

        return { text, choices };
    } catch (error) {
        console.error("Error getting Gemini response:", error);
        return { text: "Error getting response from AI.", choices: [] };
    }
};

function parseChoices(text) {
    const choiceRegex = /(\d️⃣|🔢|\[\d\]|\d\.)\s(.+?)(?=(\d️⃣|🔢|\[\d\]|\d\.|$))/gs;
    const choices = [];
    let match;

    while ((match = choiceRegex.exec(text)) !== null) {
        const number = match[1].trim();
        const description = match[2].trim();
        choices.push({ number, description });
    }
    return choices;
}

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
4. **Format of Response:**  
   - **Narration:** Describe the current situation.  
   - **Choices:** Provide three numbered options for the player.  
   - **Example Output:**  
     \`\`\`
     As you enter the ancient ruins, the air is thick with the scent of moss and decay. A faint glow pulses from deep within the shadows.  
     Suddenly, you hear a growl behind you. A large, hooded figure steps forward, gripping a rusted blade.  

     What do you do?  
     1️⃣ Draw your sword and prepare to fight.  
     2️⃣ Attempt to reason with the figure, offering a trade.  
     3️⃣ Run towards the glowing light, hoping to escape.  
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
        const choices = parseChoices(text);

        text = trimChoicesFromText(text, choices);

        conversationHistory += `${initialPrompt}\n${text}\n`;

        return { text, choices };
    } catch (error) {
        console.error("Error generating initial prompt:", error);
        return { text: "Error generating initial prompt.", choices: [] };
    }
};

function trimChoicesFromText(text, choices) {
    let trimmedText = text;

    for (const choice of choices) {
        const choiceRegex = new RegExp(`${choice.number}\\s${choice.description}`, 'g');
        trimmedText = trimmedText.replace(choiceRegex, "").trim();
    }
    return trimmedText;
}