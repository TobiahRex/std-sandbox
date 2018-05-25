import rl from 'readline';
import fs from 'fs';
import * as cFuncs from './controllers';


start(cFuncs)
.then(({
  filePath,
  parseGame,
  getScores,
  getWinner,
  writeAnswer,
}) => {
  const readLine = rl.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  }),
  composeSolution = [
    parseGame,
    getScores,
    getWinner,
    writeAnswer,
  ],
  lines = [];

  readLine.on('line', (line) => {
    lines.push(line);
  });

  readLine.on('close', () => {
    const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), lines);

    process.stdout.write(`${answer}\n`);
  });

})
.catch(process.stdout.write);

// const readLine = rl.createInterface({
//         input: fs.createReadStream(process.argv[2]),
//         output: process.stdout,
//         terminal: true,
//       }),
//       composeSolution = [
//         parseGame,
//         getScores,
//         getWinner,
//         writeAnswer,
//       ],
//       lines = [];

// readLine.on('line', (line) => {
//   lines.push(line);
// });
//
// readLine.on('close', () => {
//   const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), lines);
//
//   process.stdout.write(`${answer}\n`);
// });
