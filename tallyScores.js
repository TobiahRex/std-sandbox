import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: null,
  terminal: false,
}),
lines = [],
composeSolution = [
  'handleGame',
  'tallyPoints',
  'getAnswer'
],
scoresTable = {};

rl.on('line', (line) => {
  lines.concat(line);
});

rl.on('close', () => {
  const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), lines);
  process.std.out(answer);
})
/*
  extract chars
  update or add to hashtable
  reduce scoresTable
  return solution
*/

const handleGame = gameStr =>
  gameStr
    .match(/\b[^\W\d]+\b|\d+/g)
    .reduce((stats, stat, i) => {
      const teams = Object.keys(stats);
      if(i % 2 == 0 || i === 0) {
        stats[stat] = 0;
      } else {
        stats[teams[teams.length - 1]] += Number(stat)
      }
      return stats;
    }, {});

const tallyPoints = (game, scoresTable) => {
  const addTeamScore = (table, team, score) => {
          table[team] = Number(score);
          return table;
        },
        updateTeamScore = (table, team, score) => {
          table[team] += Number(score)
        },
        game = {};

  updatedTable = Object
    .keys(game)
    .forEach(team => {
      if (scoresTable[team]) {
        updateTeamScore(scoresTable, team, game[team]);
      } else {
        addTeamScore(scoresTable, team, game[team]);
      }
    })
}

const findWinner = (scoresTable) => {

}
