declare const mapArray: <T, U>(array: T[], callback: (item: T, index: number, array: readonly T[]) => U) => U[];
export = mapArray;
