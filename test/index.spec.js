import assert from 'assert';
import * as controllers from '../solution';

describe('Function "start" Test', () => {
  it('Should receive string input from user via CLI.');
})

describe('Function "parseGame" Test', () => {
  const collection = controllers.parseGame(['Lions 3, Snake 3']);

  it('Function output should be collection.', () => {
    assert.equal(true, Array.isArray(collection));
  });

  it('Output should contain only object(s)', () => {
    const results = collection.map((game) => {
      if (typeof game === 'object' && game !== null) return true;
      return false;
    })
    assert.equal(results.indexOf(false), -1);
  });

  it('Each object should have 2 teams and 2 scores.');
  it('Each objects <value> should be a Number.');
});
describe('Function "getScores" Test', () => {
  it('Function param should be collection of objects.');
  it('Function output should be single object.');
  it('Output object keys should be strings.');
  it('Output object values should be numbers.');
});
describe('Function "getWinner" Test', () => {
  it('Function param should be single Object.');
  it('Funtion output should be single Object.');
});

describe('Function "writeAnswer" Test', () => {
  it('Function param should be single Object.');
  it('Funtion output should be single string.');
  it('Output string should have "Answer" format.')
});
