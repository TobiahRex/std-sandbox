import rl from 'readline';
import fs from 'fs';
import {
  parseLine,
  calcScores,
  findWinner,
  writeAnswer,
} from './helpers';

const readLine = rl.createInterface({
        input: fs.createReadStream(process.argv[2]),
        output: process.stdout,
        terminal: false,
      }),
      composeSolution = [
        parseLine,
        calcScores,
        findWinner,
        writeAnswer,
      ],
      lines = [];

readLine.on('line', (line) => {
  lines.push(line);
});

readLine.on('close', () => {
  const answer = composeSolution
    .reduce((value, nextFunc) =>
      nextFunc(value), lines
    );

  process.stdout.write(`${answer}\n`);
});
