export const start = (helpers) =>
new Promise((resolve, reject) => {
  process.stdout.write('Please provide the file path for all team scores: ');
  process.stdin.once('data', (filePath) => {
    process.stdout.write(`Thank you. Generating solution for file: ${filePath.toString().trim()} ...`);
    resolve(({ filePath, ...helpers }));
  });
  process.exit();
});

/**
* 1) map over collection of game strings,
* 2) extract team name & team scores into their own respective arrays.
* 3) create new tuple, with extracted data - assign respective values by index
* 4) return object per map iteration.
*
* @param {array} games - Collection of strings, each string is 1 game containing 2 teams and 2 scores.
*
* @return {array} - Collection of objects: { <team1>: <score1>, <team2>: <score2> }
*/
export const parseGame = games =>
  games
  .map(gameStr => {
    const teams = gameStr
                .slice(0)
                .split(/\s\d+,\s|\s\d+/g)
                .slice(0, 2),

        scores = gameStr
                .slice(0)
                .match(/\d+/g),

        parsedStat = (t, s) => ({
          team1: {
            name: t[0],
            score: Number(s[0]),
          },
          team2: {
            name: t[1],
            score: Number(s[1]),
          }
        });

      return parsedStat(teams, scores);
  });

export const getScores = games => {
  const getGameScore = ({ team1, team2 }) => {
          if (team1.score === team2.score) return ({
            [team1.name]: 1,
            [team2.name]: 1,
          });

          if (team1.score > team2.score) return ({
            [team1.name]: 3,
            [team2.name]: 0,
          });

          return({
            [team1.name]: 0,
            [team2.name]: 3,
          });
        },
        saveScore = ({ type, allScores, team, score }) => {
          type === 'add' ? allScores[team] = score : allScores[team] += score;
          return allScores;
        }

  return games
  .reduce((allScores, game) => {
    const gameScore = getGameScore(game);

    Object
    .keys(gameScore)
    .forEach(team => {
      if (team in allScores) {
        allScores = saveScore({
          team,
          allScores,
          type: 'update',
          score: gameScore[team],
        });
      }
      else {
        allScores = saveScore({
          team,
          allScores,
          type: 'add',
          score: gameScore[team],
        });
      }
    });
    return allScores;
    }, {});
}

export const getWinner = inputScores => {
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

export const writeAnswer = scores =>
  Object
  .keys(scores)
  .reduce((str, nextTeam, i) => {
    const score = scores[nextTeam],
          suffix = (s) => {
            if (1 > s || s > 1) return 'pts';
            return 'pt';
          };

    return str += `<nl>${i + 1}. ${nextTeam}, ${score} ${suffix(score)}`
      .split('<nl>')
      .join('\n');
  }, '');
