import rl from 'readline';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import * as controllers from './';


/**
* File: main.js
* Calls "start" <see "start" func. desc. for more info>,
* creates a read interface using node's core module "fs" to read a scores file line by line.
* Each line is added individually to a collection: "lines".
* "lines", along with the control functions "controllers", are passed to a reducer,
* that uses functional programming methodology to waterfall the previous functions
* output into the next functions input, until the final answer is found and read back to the user.
*/
controllers
.start(controllers)
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
    lines.push(line);
  });

  readLine.on('close', () => {
    const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), lines);

    process.stdout.write(`${answer}\n\n`.cyan);
    process.exit();
  });

  readLine.on('error', (error) => {
    console.log('ERROR: ', error);
  });

})
.catch((e) => {
  console.log('error: ', e);
});
