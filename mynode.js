const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({path: 'src/.env'}); ;

const envFile = `export const environment = {
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
};
`;
const targetPath = path.join(__dirname, './src/environments/environments.development.ts');
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environments.development.ts`);
    }
});