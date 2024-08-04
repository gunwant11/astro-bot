// utils/decodeKeyJson.js
import fs from 'fs';
import path from 'path';

export const decodeKeyJson = () => {
    const keyJsonBase64 = process.env.KEY_JSON_BASE64;
    if (!keyJsonBase64) {
        throw new Error('Environment variable KEY_JSON_BASE64 is not set.');
    }

    const keyJson = Buffer.from(keyJsonBase64, 'base64').toString('utf-8');
    const keyPath = path.join(process.cwd(), 'key.json');

    fs.writeFileSync(keyPath, keyJson, 'utf-8');
};
