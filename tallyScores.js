import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: process.stdout,
  terminal: false,
}),
composeSolution = [
  handleGame,
  // tallyScores,
  // getAnswer
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
  const x = games
  .map(game => game
    .split(/\d/)
  )

  console.log('x: ', x);

  // return games
  //   .map(game => game
  //     .match(/([^\W\d]+\s[^\W\d]+)|\d+|[^\W]+/g)
  //     .reduce((stats, stat, i) => {
  //       const teams = Object.keys(stats);
  //       if(i % 2 == 0 || i === 0) {
  //         stats[stat] = 0;
  //       } else {
  //         stats[teams[teams.length - 1]] += Number(stat);
  //       }
  //       return stats;
  //     }, {})
  //   );
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
