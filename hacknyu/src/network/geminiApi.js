import axios from "axios";

const API_KEY = "your-google-gemini-api-key"; // Replace with your actual key
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

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
