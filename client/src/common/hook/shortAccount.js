export const shortAccount = (address) => {
  return `${address.slice(0, 4)}...${address.length}`;
};
