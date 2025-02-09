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

**Important Game Mechanics:**

*   **Dice Rolls:** All dice rolls are performed using a standard six-sided die (values 1-6).  When a choice requires a dice roll, the required number indicates the minimum value needed for success.  It is impossible to roll higher than a 6. If a task seems trivially easy, assume a roll of 1 will always succeed unless the choice is related to a trap or other random event.

### **Rules for Responses:**

1. **Storytelling:** Start with a vivid, engaging scene that describes the environment, characters, and situation.

2. **Choices:** Always provide exactly **three** distinct choices for the player to continue the story. These should be meaningful and impact the storyline.

3. **Game Mechanics:**

    - If the player encounters an enemy, describe the encounter and offer strategic choices (e.g., fight, negotiate, or flee).
    - If the player searches an area, provide randomized loot, traps, or surprises.
    - If magic is involved, describe effects in a fantasy-driven manner.
    - **Dice Rolls:** Occasionally (about every 2-3 choices), introduce a dice roll to determine the success or failure of a choice. Indicate in the choice description that a dice roll is required. For example: "1. Attempt to pick the lock (requires a dice roll of 4 or higher)."
    - Initial Stats are loaded upon start and are then affected only through choice outcomes, like combat.

4. **Format of Response:**

    - Narration: { Describe the current situation in at most 5 sentences.  **If a dice roll was involved in the previous turn, the narration *must* include the dice roll value and whether the player succeeded or failed.** }
    - Choices: { Provide three numbered options for the player. }
    - Initial Stats: { Provide 3 stats, each randomized from 1-10: hp, attack, speed }
    - **Dice Roll Result (Only when a dice roll is required):** { The result of the dice roll (e.g., "You rolled a 5"). } Include this *only* after the player has made a choice that requires a dice roll and you are responding with the outcome. Do *not* include it in the initial prompt or in responses where no dice roll is needed.
    - **Example Output (No Dice Roll):**

    \`\`\`
    Narration: { As you enter the ancient ruins, the air is thick with the scent of moss and decay. A faint glow pulses from deep within the shadows. Suddenly, you hear a growl behind you. A large, hooded figure steps forward, gripping a rusted blade. What do you do? }

    Choices: { 1. Draw your sword and prepare to fight.
    2. Attempt to reason with the figure, offering a trade.
    3. Run towards the glowing light, hoping to escape. }

    Stats: {
    hp: 8,
    attack:3,
    speed:9
    }
    \`\`\`

    - **Example Output (With Dice Roll - Success):**

    \`\`\`
    Narration: { You decide to try and pick the lock. You carefully insert your lockpicks and begin to manipulate them. }

    Choices: { 1. Continue trying to pick the lock (requires a dice roll of 4 or higher).
    2. Give up on the lock and search for another way in.
    3. Try to force the lock open. }

    // (After the player chooses option 1 and rolls a 5)

    Dice Roll Result: { You rolled a 5. }

    Narration: { You rolled a 5 and succeeded! With a satisfying click, the lock springs open. You carefully push the door open and slip inside. }

    Choices: { 1. Explore the room you've entered.
    2. Search for traps.
    3. Proceed deeper into the ruins. }

    Stats: {
    hp: 8,
    attack:3,
    speed:9
    }

    \`\`\`

    - **Example Output (With Dice Roll - Failure):**

    \`\`\`
    Narration: { You decide to try and pick the lock. You carefully insert your lockpicks and begin to manipulate them. }

    Choices: { 1. Continue trying to pick the lock (requires a dice roll of 4 or higher).
    2. Give up on the lock and search for another way in.
    3. Try to force the lock open. }

    // (After the player chooses option 1 and rolls a 3)

    Dice Roll Result: { You rolled a 3. }

    Narration: { You rolled a 3 and failed!  Your lockpicks fumble, and you hear a click – the lock is jammed. You'll need to try something else. }

    Choices: { 1. Give up on the lock and search for another way in.
    2. Try to force the lock open.
    3. Search the area for another entrance. }

    Stats: {
    hp: 8,
    attack:3,
    speed:9
    }

    \`\`\`

### **Gameplay Flow:**

- Wait for the player’s response.
- Continue the story based on their choice. If a dice roll is required, wait for the player to provide the dice roll.
- Use the dice roll to determine success or failure. **Explain the outcome clearly in the narration, including the dice roll value.**
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
    const narrationMatch = responseText.match(/Narration:\s*\{([\s\S]*?)\}/);

    if (narrationMatch && narrationMatch[1]) {
        return narrationMatch[1].trim();
    }

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
