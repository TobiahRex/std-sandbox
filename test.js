const game = 'Lions 3, Snakes 3'
  .match(/\b[^\W\d]+\b|\d+/g)
  .reduce((stats, stat, i) => {
    const teams = Object.keys(stats);
    if(i % 2 == 0 || i === 0) {
      stats[stat] = 0;
    } else {
      stats[teams[teams.length - 1]] += Number(stat)
    }
    return stats;
  }, {});
  console.log(game);
