export const getEachNthIndexFromZeroTillMax = (n: number, max: number): number[] => {
    const result = [];
    let index: number = 0;

    do {
        result.push(index);
        index += n;
    } while (index < max)

    return result;
};
