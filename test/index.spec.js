import assert from 'assert';
import * as controllers from '../solution';

describe('Function "start" Test', () => {
  it('Should receive string input from user via CLI.');
})

describe('Function "parseGame" Test', () => {
  const gameObjects = controllers.parseGame(['Lions 3, Snake 3']);

  it('Function output should be an <Array>.', () => {
    assert.equal(true, Array.isArray(gameObjects));
  });

  it('Output should contain only object(s)', () => {
    const results = gameObjects.map((game) => {
      if (typeof game === 'object' && game !== null) return true;
      return false;
    });

    assert.equal(results.indexOf(false), -1);
  });

  it('Each object should have TWO teams and scores.', () => {
    const results = gameObjects.map((game) =>
      Object.keys(game).length === 2 ? true : false);

    assert.equal(true, results.indexOf(false) === -1);
  });

  it('Each objects <value> should be a Number.', () => {
    const valueTypes = gameObjects.map((game) =>
      Object.keys(game).reduce((results, nextTeam) => {
        results.push(typeof game[nextTeam].score === 'number');
        return results;
      }, []))
      .reduce((acc, next) => next);

    assert.equal(true, valueTypes.indexOf(false) === -1);
  });
});

describe('Function "getScores" Test', () => {
  const allScores = controllers.getScores([{
    team1: {
      name: 'Lions',
      score: 3,
    },
    team2: {
      name: 'Snakes',
      score: 2,
    },
  }]);

  it('Function output should be single object.', () => {
    assert.equal(true, typeof allScores === 'object' && allScores !== null);
  });
  it('Output object values should be numbers.', () => {
    const results = Object.keys(allScores).map((key) => typeof allScores[key] === 'number');
    assert.equal(true, results.indexOf(false) === -1);
  });
});

describe('Function "getWinner" Test', () => {
  const winnerObj = controllers.getWinner({
    Lions: 5,
    'FS nakes': 1,
    Tarantulas: 6,
    'FC Awesome': 1,
    Grouches: 0,
  });

  console.log('winnerObj: ', winnerObj);
  it('Function output should be a single Object.', () => {
    assert.equal(true, typeof winnerObj === 'object' && winnerObj !== null);
  });
});

describe('Function "writeAnswer" Test', () => {
  const answerStr = controllers.writeAnswer({
    Tarantulas: 6,
    Lions: 5,
    'FC Awesome': 1,
    'FS nakes': 1,
    Grouches: 0
  });

  it('Function output should be single string.', () => {
    assert.equal('string', typeof answerStr);
  });
  it('Output string should have "Answer" format.')
});
