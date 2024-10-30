export const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const generateArray = (length: number): number[] => {
    return Array.from({ length }, (_, index) => index + 1);
  };

export  const roundNumber = (num: number): number => {
    return Math.round(num);
  };