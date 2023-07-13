// import { Assistant } from '@/Model/Assistant';

// const fs = require('fs');
// const csv = require('csv-parser');

// export async function readAstInputFile(filePath) {
//     const assistants = [];

//     return new Promise((resolve, reject) => {
//         fs.createReadStream(filePath)
//         .pipe(csv({ delimiter: ';' }))
//         .on('data', (row) => {
//             assistants.push(new Assistant(row.Initial, row.AssistantName));
//         })
//         .on('end', () => {
//             resolve(assistants);
//         })
//         .on('error', (error) => {
//             reject(error);
//         });
//     });
// }