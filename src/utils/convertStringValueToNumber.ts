export const convertStringValueToNumber = (value: string): number => {
  if (value === "A") {
    return 11;
  } else if (isNaN(value)) {
    return 10;
  }
  return Number(value);
};
