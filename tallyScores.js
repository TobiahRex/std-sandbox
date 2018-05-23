import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: null,
  terminal: false,
}),
composeSolution = [
  handleGame,
  tallyScores,
  getAnswer
],
lines = [];

rl.on('line', (line) => {
  lines.push(line);
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

function handleGame(games) {
  return games
    .map(game => game
      .match(/([^\W\d]+\s[^\W\d]+)|\d+|[^\W]+/g)
      .reduce((stats, stat, i) => {
        const teams = Object.keys(stats);
        if(i % 2 == 0 || i === 0) {
          stats[stat] = 0;
        } else {
          stats[teams[teams.length - 1]] += Number(stat);
        }
        return stats;
      }, {})
    );
}

function tallyScores(games) {
  console.log('games: ', games);
  const addTeamScore = (table, team, score) => {
          table[team] = Number(score);
          return table;
        },
        updateTeamScore = (table, team, score) => {
          table[team] += Number(score)
          return table;
        };

  return games
  .reduce((scoresTable, game) => {
    Object
    .keys(game)
    .forEach(team => {
      if (scoresTable[team]) {
        scoresTable = updateTeamScore(scoresTable, team, game[team]);
      } else {
        scoresTable = addTeamScore(scoresTable, team, game[team]);
      }

      return scoresTable;
    }, {});
  }, {});
  // const finalScores = Object.keys(game)
  //   .reduce(scoresTable, team => {
  //     if (scoresTable[team]) {
  //       scoresTable = updateTeamScore(scoresTable, team, game[team]);
  //     } else {
  //       scoresTable = addTeamScore(scoresTable, team, game[team]);
  //     }
  //
  //     return scoresTable;
  //   }, {});
  //   return finalScores;
}

function getAnswer(finalScores) {
  console.log('finalScores: ', finalScores);
}
