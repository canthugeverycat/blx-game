/**
 * Checks if a number is a prime number.
 *
 * @param {number} value
 * @returns {boolean}
 */
const isPrime = (value: number): boolean => {
  for (let i = 2, s = Math.sqrt(value); i <= s; i++) {
    if (value % i === 0) return false;
  }
  return value > 1;
};

export default isPrime;
