import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env.local');

async function main() {
    try {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);

        if (!match) {
            console.error("Could not find VITE_GEMINI_API_KEY");
            return;
        }

        const API_KEY = match[1].trim();
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

        console.log("Fetching models...");
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            const allModels = data.models.map(m => {
                const name = m.name.replace('models/', '');
                const methods = m.supportedGenerationMethods.join(',');
                return `${name} [${methods}]`;
            }).join('\n');

            fs.writeFileSync(path.resolve(__dirname, '../models_verified.txt'), allModels);
            console.log("Saved models to models_verified.txt");
        } else {
            console.error("No models found or API error:", JSON.stringify(data));
        }

    } catch (err) {
        console.error("Error:", err);
    }
}

main();
