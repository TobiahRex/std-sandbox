import readline from 'readline';
import fs from 'fs';
import helperFuncs from './helpers';

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: process.stdout,
  terminal: false,
}),
composeSolution = [
  parseGame,
  tallyScores,
  getAnswer
],
lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), lines);
  process.stdout.write(JSON.stringify(answer, null, 2));
})

function parseGame(games) {
  return games
  .map(game => {
    const teams = game
                .slice(0)
                .split(/\s\d+,\s|\s\d+/g)
                .slice(0, 2),
        scores = game
                .slice(0)
                .match(/\d+/g),
        zipStats = (t, s) => ({
          [t[0]]: s[0],
          [t[1]]: s[1],
        });

      return zipStats(teams, scores);
  });
}

function tallyScores(games) {
  const saveScore = ({ type, table, team, score }) => {
          type === 'add' ? table[team] = Number(score) : table[team] += Number(score);
          return table;
        }

  return games
  .reduce((scoresTable, game) => {
    Object
    .keys(game)
    .forEach(team => {
      if (team in scoresTable) {
        scoresTable = saveScore({
          type: 'update',
          table: scoresTable,
          team,
          score: game[team],
        });
      }
      else {
        scoresTable = saveScore({
          type: 'add',
          table: scoresTable,
          team,
          score: game[team],
        });
      }
    });
    return scoresTable;
    }, {});
}

function getAnswer(inputScores) {
  const finalScores = {},
        sortTeams = (team1, team2) => {
          const team1score = inputScores[team1],
                team2score = inputScores[team2];

          if (team1score - team2score > 0) return -1;
          if (team1score - team2score < 0) return +1;
          if (team1.charCodeAt(0) - team2.charCodeAt(0) > 0) return +1;
          if (team1.charCodeAt(0) - team2.charCodeAt(0) < 0) return -1;
          return 0;
        };

  Object
  .keys(inputScores)
  .sort(sortTeams)
  .forEach((key) => {
    finalScores[key] = inputScores[key];
  })
  return finalScores;
}
