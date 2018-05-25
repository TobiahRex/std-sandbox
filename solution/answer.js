import rl from 'readline';
import fs from 'fs';
import {
  parseGame,
  getScores,
  getWinner,
  writeAnswer,
} from './helpers';

const readLine = rl.createInterface({
        input: fs.createReadStream(process.argv[2]),
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
