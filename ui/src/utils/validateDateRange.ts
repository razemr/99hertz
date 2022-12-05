export const validateDateRange = (from: string, to: string) => {
  return new Date(from).getTime() <= new Date(to).getTime();
};
