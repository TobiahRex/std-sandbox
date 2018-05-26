import rl from 'readline';
import fs from 'fs';
import path from 'path';

const lines = [];

const start = () =>
new Promise((resolve, reject) => {
  process.stdout.write('Please provide the file path for all team scores: ');
  process.stdin.once('data', (filePath) => {
    process.stdout.write(`Thank you. Generating solution for file: "${filePath.toString().trim()}" ...`);
    resolve(filePath.toString('utf8').trim());
  });
});


start()
.then((filePath) => {
  console.log('filePath: ', filePath);
  const readLine = rl.createInterface({
    input: fs.createReadStream(path.resolve(filePath)),
    output: process.stdout,
    terminal: false,
  });
  readLine.on('line', (line) => {
    console.log('LINE: ', line);
    lines.push(line);
  });

  readLine.on('close', () => console.log('END'))
})
.catch(error => {
  console.log('Promise Error: ', error);
})
//
// const readLine = rl.createInterface({
//     input: fs.createReadStream(process.argv[2]),
//     output: process.stdout,
//     terminal: false,
//   });
//
// readLine.on('line', (line) => {
//   console.log('line: ', line);
// })
// readLine.on('close', () => {
//   console.log('END');
// })
