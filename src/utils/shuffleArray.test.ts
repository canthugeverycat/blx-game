import shuffleArray from './shuffleArray';

describe('shuffleArray.ts', () => {
  it('shuffles the elements', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(array);

    expect(shuffledArray).toHaveLength(array.length);
    expect(shuffledArray).toEqual(expect.arrayContaining(array));
  });

  it('handles single element array', () => {
    const array = [1];
    const shuffledArray = shuffleArray(array);

    expect(shuffledArray).toEqual([1]);
  });
});
