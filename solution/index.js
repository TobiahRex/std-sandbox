import rl from 'readline';
import fs from 'fs';
import * as cFuncs from './controllers';
import path from 'path';


cFuncs.start(cFuncs)
.then(({
  file,
  parseGame,
  getScores,
  getWinner,
  writeAnswer,
}) => {
  const readLine = rl.createInterface({
    input: fs.createReadStream(path.resolve(file)),
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
    console.log('LINE: ', line);
    lines.push(line);
  });

  readLine.on('close', () => {
    const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), lines);

    process.stdout.write(`${answer}\n`);
    process.exit();
  });

  readLine.on('error', (error) => {
    console.log('ERROR: ', error);
  });

})
.catch((e) => {
  console.log('error: ', e);
});

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
