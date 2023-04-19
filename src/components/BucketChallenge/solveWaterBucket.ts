type bucketState = { bucketA: number; bucketB: number };

type QueueNode = {
  state: bucketState;
  steps: string[];
  detail: bucketState[];
};

export const solveWaterBucket = (
  capA: number,
  capB: number,
  target: number
): { solution: string[]; steps: any } | null => {
  const visited = new Set<string>();
  const queue: QueueNode[] = [
    { state: { bucketA: 0, bucketB: 0 }, steps: [], detail: [] },
  ];

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (node.state.bucketA === target || node.state.bucketB === target) {
      const solution = [...node.steps];
      const steps = [...node.detail];
      return { solution, steps };
    }

    const { bucketA, bucketB } = node.state;

    // Fill bucket A
    if (!visited.has(`${capA},${bucketB}`)) {
      visited.add(`${capA},${bucketB}`);
      queue.push({
        state: { bucketA: capA, bucketB },
        steps: [...node.steps, `Fill bucket A`],
        detail: [...node.detail, { bucketA: capA, bucketB }],
      });
    }

    // Fill bucket B
    if (!visited.has(`${bucketA},${capB}`)) {
      visited.add(`${bucketA},${capB}`);
      queue.push({
        state: { bucketA, bucketB: capB },
        steps: [...node.steps, `Fill bucket B`],
        detail: [...node.detail, { bucketA, bucketB: capB }],
      });
    }

    // Empty bucket A
    if (!visited.has(`0,${bucketB}`)) {
      visited.add(`0,${bucketB}`);
      queue.push({
        state: { bucketA: 0, bucketB },
        steps: [...node.steps, `Empty bucket A`],
        detail: [...node.detail, { bucketA: 0, bucketB }],
      });
    }

    // Empty bucket B
    if (!visited.has(`${bucketA},0`)) {
      visited.add(`${bucketA},0`);
      queue.push({
        state: { bucketA, bucketB: 0 },
        steps: [...node.steps, `Empty bucket B`],
        detail: [...node.detail, { bucketA, bucketB: 0 }],
      });
    }

    // Transfer from A to B
    const amount = Math.min(bucketA, capB - bucketB);
    if (amount > 0 && !visited.has(`${bucketA - amount},${bucketB + amount}`)) {
      visited.add(`${bucketA - amount},${bucketB + amount}`);
      queue.push({
        state: { bucketA: bucketA - amount, bucketB: bucketB + amount },
        steps: [...node.steps, `Transfer from A to B`],
        detail: [
          ...node.detail,
          { bucketA: bucketA - amount, bucketB: bucketB + amount },
        ],
      });
    }

    // Transfer from B to A
    const amount2 = Math.min(bucketB, capA - bucketA);
    if (
      amount2 > 0 &&
      !visited.has(`${bucketA + amount2},${bucketB - amount2}`)
    ) {
      visited.add(`${bucketA + amount2},${bucketB - amount2}`);
      queue.push({
        state: { bucketA: bucketA + amount2, bucketB: bucketB - amount2 },
        steps: [...node.steps, `Transfer from B to A`],
        detail: [
          ...node.detail,
          { bucketA: bucketA + amount2, bucketB: bucketB - amount2 },
        ],
      });
    }
  }

  return null;
};
