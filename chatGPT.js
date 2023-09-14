

const OpenAIApi = require("openai");
const openai = new OpenAIApi({
    apiKey: "INPUT YOUR API KEY HERE",
});

exports.response = async (prompt) => {
    // Check if the prompt contains a request for image generation
    if (prompt.includes("/img")) {
        // Use DALL·E model for image generation
        return await openai.images.generate({
            prompt: prompt,
            n: 1,
            response_format: 'url',
            size: '1024x1024',
        });
    } else {
        // Use the GPT-3.5 Turbo model for text-based responses
        return await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
    }
}
