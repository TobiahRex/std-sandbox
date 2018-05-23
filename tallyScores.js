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
      if (team in scoresTable) {
        scoresTable = updateTeamScore(scoresTable, team, game[team]);
      }
      else {
        scoresTable = addTeamScore(scoresTable, team, game[team]);
      }
    });
    return scoresTable;
    }, {});
}

function getAnswer(finalScores) {
  const sortedScores = {},
        sortTeams = (prev, next) => {
          const team1score = finalScores[prev],
                team2score = finalScores[next],
                teams = [prev, next];

          console.log('team1name: ', team1name, '\nteam2name: ', team2name);
          console.log('/--------/');
          if (team1score - team2score > 0) {
            if (teams.sort()[0] === prev) {
              return +1;
            }
            return -1;
          }
          if (team1score - team2score < 0) {
            if (teams.sort()[0] === prev) {
              return -1;
            }
            return +1;
          }
          return 0
        };

  console.log(Object.keys(finalScores));

  Object
  .keys(finalScores)
  .sort(sortTeams)
  .forEach((key) => {
    console.log('key: ', key);
    sortedScores[key] = finalScores[key];
  })
  return sortedScores;
}
