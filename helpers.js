export default {
  zip: (arr1, arr2) => {
    if (!arr1.length || !arr2.length) {
      return new Error('Input Array cannot be empty.');
    }

    const zippedArray = [];

    for (
      let i = 0;
      i < Math.min(arr1.length, arr2.length);
      i ++
    ) {
      zippedArray.push()
    }
  }
}
