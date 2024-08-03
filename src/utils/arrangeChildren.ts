import { RefObject } from 'react';

/**
 * Arranges items inside a container with the following rules:
 * 1. All items that are in the container viewport should stay there
 * 2. All items from the left that are overflowing will be moved to the right
 *
 * @param {number} length            Total number of items.
 * @param {number} itemSize          Size (width) of each item.
 * @param {number} focusedIndex      Index of the currently focused item.
 * @param {number} containerWidth    Width of the container.
 * @param {number[]} positions       Array of current positions of the items.
 * @param {any} container            Container element ref.
 *
 * @return {number[]}   New positions
 */
const arrangeChildren = ({
  length,
  itemSize,
  focusedIndex,
  containerWidth,
  positions,
  containerRef,
}: {
  length: number;
  itemSize: number;
  focusedIndex: number;
  containerWidth: number;
  positions: number[];
  containerRef: RefObject<HTMLDivElement>;
}): number[] => {
  const containerRect = containerRef.current?.getBoundingClientRect();
  const containerCenter = (containerWidth - itemSize) / 2;
  const itemsToCenter = Math.ceil(containerCenter / itemSize);
  const newPositions = [...positions];

  // Determine what item is the first in view
  const start = (focusedIndex - itemsToCenter + length) % length;

  // Adjust positions for items overflowing the container to the left
  for (let i = 0; i < length; i++) {
    const child = containerRef.current?.firstElementChild?.children[i];
    const childRect = child?.getBoundingClientRect();

    if (childRect && containerRect && childRect.right < containerRect.left) {
      newPositions[i] = newPositions[i] + 1;
    }
  }

  // Make sure items that were out of view during a resize are brought back into view
  // (This handles window resizing)
  for (let x = start; x < start + itemsToCenter; x++) {
    const wrappedIndex = (x + length) % length;

    newPositions[wrappedIndex] =
      wrappedIndex < focusedIndex
        ? newPositions[focusedIndex]
        : newPositions[focusedIndex] - 1;
  }

  return newPositions;
};

export default arrangeChildren;
