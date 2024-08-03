/**
 * Shuffles the provided array
 *
 * @param {T[]} array
 * @returns {T[]}
 */
const shuffleArray = (array: any[]) => {
  const result = [...array];
  let i = array.length;

  while (i !== 0) {
    let randomIndex = Math.floor(Math.random() * i);
    i = i - 1;

    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }

  return result;
};

export default shuffleArray;
