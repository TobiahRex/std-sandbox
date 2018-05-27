import rl from 'readline';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import * as controllers from './';


/**
* Main Control Flow
* Calls "start" <see "start" func. desc. for more info>,
* creates a read interface using node's core module "fs" to read scores file line by line.
* each line s added individually to a collection "lines".
* "lines", along with the control function "controllers", are passed to a reducer,
* the reducer, uses functional programming methodology to waterfall the previous functions
* output into the next functions input, until the final answer is found.
*
* @param {object} - Collection of helper functions - for a "pure funciton" pardigm.
*
* @return {object} - Collection of helper functions with added file path from user input.
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
