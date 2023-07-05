// get tags for type of tasks completed
// get USDC earnings from tasks
// get organisations worked for
// get number of tasks for each organisation you've worked for

const processDeworkData = (data: any) => {};

export const getDeworkData = (userAddress: string) => {
  const deworkData = fetch(
    `https://api.deworkxyz.com/v1/reputation/${userAddress}`,
  ).then((res) => res.json());
  return deworkData;
};
