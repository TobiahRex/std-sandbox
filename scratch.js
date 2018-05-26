const x = [null],
  result = x.map((y) => {
    if (typeof y === 'object' && y !== null) return true;
    return false;
  })

console.log(result);
