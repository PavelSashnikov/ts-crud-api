export const balanceRR = (clustersCount: number) => {
  let currentCluster = 0;
  return () => {
    if (currentCluster === clustersCount) {
      return (currentCluster = 1);
    }

    return ++currentCluster;
  };
};
