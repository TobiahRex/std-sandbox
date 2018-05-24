export const parseLine = games =>
  games
  .map(game => {
    const teams = game
                .slice(0)
                .split(/\s\d+,\s|\s\d+/g)
                .slice(0, 2),
        scores = game
                .slice(0)
                .match(/\d+/g),
        zipStats = (t, s) => ({
          team1: {
            name: [t[0]],
          }
          [t[0]]: s[0],
          [t[1]]: s[1],
        });

      return zipStats(teams, scores);
  });

export const calcScores = games => {
  const getScore = ({ team1, team2 }) => {
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
        saveScore = ({ type, table, team, score }) => {
          type === 'add' ? table[team] = score : table[team] += score;
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

export const findWinner = inputScores => {
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
