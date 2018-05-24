import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: process.stdout,
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
  process.stdout.write(JSON.stringify(answer, null, 2));
})

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

function getAnswer(finalScores) {
  const sortedScores = {},
        sortTeams = (prev, next) => {
          const team1score = finalScores[prev],
                team2score = finalScores[next];

          if (team1score - team2score > 0) return -1;
          if (team1score - team2score < 0) return +1;
          if (prev.charCodeAt(0) - next.charCodeAt(0) > 0) return +1;
          if (prev.charCodeAt(0) - next.charCodeAt(0) > 0) return -1;
          return 0;
        };

  // console.log(Object.keys(finalScores));

  Object
  .keys(finalScores)
  .sort(sortTeams)
  .forEach((key) => {
    sortedScores[key] = finalScores[key];
  })
  return sortedScores;
}
