export const arrangeChildren = ({
  length,
  itemSize,
  focusedIndex,
  containerWidth,
  positions,
  container,
}: {
  length: number;
  itemSize: number;
  focusedIndex: number;
  containerWidth: number;
  positions: number[];
  container: any;
}): number[] => {
  const containerCenter = (containerWidth - itemSize) / 2;
  const itemsToCenter = Math.ceil(containerCenter / itemSize);
  const newPositions = [...positions];
  const containerRect = container.current.getBoundingClientRect();

  const start = (focusedIndex - itemsToCenter + length) % length;

  // Adjust positions for items outside the container
  for (let i = 0; i < length; i++) {
    const child = container.current.firstElementChild?.children[i];
    const childRect = child?.getBoundingClientRect();

    if (childRect && childRect.right < containerRect.left) {
      newPositions[i] = newPositions[i] + 1;
    }
  }

  // This ensures that items that were out of view during a resize
  // are brought back into view when the window is resized

  for (let x = start; x < start + itemsToCenter; x++) {
    const wrappedIndex = (x + length) % length;

    newPositions[wrappedIndex] =
      wrappedIndex < focusedIndex
        ? newPositions[focusedIndex]
        : newPositions[focusedIndex] - 1;
  }

  return newPositions;
};
