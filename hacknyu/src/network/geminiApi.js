import axios from "axios";

const API_KEY = import.meta.env.GOOGLE_API_KEY;
const API_URL = import.meta.env.GOOGLE_API_URL;

export const fetchGeminiResponse = async (input) => {
    try {
        const response = await axios.post(
            `${API_URL}?key=${API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: input }] }]
            }
        );
        return response.data.candidates[0]?.content?.parts[0]?.text || "No response from AI.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error fetching response.";
    }
};
