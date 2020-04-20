export const isStringWithNumbers = (value: string): boolean => {
    return /^\d{1,}$/.test(value);
};
