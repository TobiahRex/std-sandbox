import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
  output: null,
  terminal: false,
}),
composeSolution = [
  'parseString',
  'tallyPoints',
  'findWinner'
],
hashTable = {};

rl.on('line', (line) => {
  const answer = composeSolution.reduce((value, nextFunc) => nextFunc(value), line);
  process.std.out(answer);
});

/*
  extract chars
  update or add to hashtable
  reduce hashTable
  return solution
*/

const parseString = (str) => {
  const isWord = char => char.test(/\b[^\W\d]+\b/g),
        isNum = char => char.test(/\d+/g),


  str.match(/\w+/g).forEach((char) => {
    if (isWord) {
      if (Object.keys(hashTable).includes(char)) {

      }
    }
  })
}

const tallyPoints = (hashTable) => {
  addTeamScore = (table, team, score) => {
    table[team] = Number(score);
    return table;
  },
  updateTeamScore = (table, team, score) => {
    table[team] += Number(score)
  }
}

const findWinner = (hashTable) => {

}
