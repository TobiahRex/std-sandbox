const teams = `Tarantulas 1, FC Awesome 0`
.slice(0)
.split(/\s\d+,\s|\s\d+/g)
.slice(0, 2)
console.log(teams);

const scores = `Tarantulas 1, FC Awesome 0`
.slice(0)
.match(/\d+/g)
// .slice(0, 2)
console.log(scores);
