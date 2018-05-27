/**
* Function: "start"
* Requests user to input relative file path location of recorded games.
*
* @param {object} - Collection of helper functions - for a "pure funciton" pardigm.
*
* @return {object} - Collection of helper functions with added file path from user input.
*/
export const start = controllers =>
  new Promise((resolve, reject) => {
    process.stdout.write('\n\nPlease provide the relative file path for all team scores: \nEXAMPLE: ./scores.txt \n>> '.white);
    process.stdin.once('data', (filePath) => {
      const file = filePath.toString('utf8').trim();
      console.log(`\nThank you. Here's the solution for file: ${file.cyan} \n`.white);
      resolve(({ file, ...controllers }));
    });
  });

/**
* Function: "parseGame"
* maps across collection of game strings.
* Parses each individual string into a new tuple with each team as the "key" and each teams game score as the "value".
*
* @param {array} - Collection of strings, each string is 1 game containing 2 teams and 2 scores.
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

/**
* Function: "getScore"
* reduce collection of individual game tuples into a single object with final scores per final scoring rules.
* uses helper function "getGameScore" that assigns final score per individual game results.
*
* @param {array} - Array of tuples with single game scores { <team1>: <score1>, <team2>: <score2> }
*
* @return {object} - Final tally of all teams and their final scores { <teamN>: <scoreN>, ... }
*/
export const getScores = (games) => {
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

/**
* Function: "getWinner"
* Receives final object with all teams and their respective scores and sorts (descending) by score.
* If a tie is found, sorts teams alphabetically.
*
* @param {object} - Unsorted { <teamN>: <scoreN>, ... }
*
* @return {object} - Sorted { <teamN>: <scoreN>, ... }
*/
export const getWinner = (inputScores) => {
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

/**
* Function: "writeAnswer"
* Receives final sorted scores object and creates single string with results.
*
* @param {object} - { <teamN>: <scoreN>, ... }
*
* @return {string} - '<N.> <TeamN>, <ScoreN>, ...'
*/
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
