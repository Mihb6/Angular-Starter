export const equalsByValue = <T>(value1: T, value2: T): boolean => {
  if (!value1) return !value2;
  if (!value2) return !value1;

  const object1Entries = Object.entries(value1).sort((a, b) => a[0].localeCompare(b[0]));
  const object2Entries = Object.entries(value2).sort((a, b) => a[0].localeCompare(b[0]));

  if (object1Entries.length != object2Entries.length) {
    return false;
  }

  return JSON.stringify(object1Entries) === JSON.stringify(object2Entries);
}

export const groupBy = <T>(array: T[], groupingFunction: (value: T) => string): Record<string, T[]> => {
  if (!array) {
    return {};
  }

  const result: Record<string, T[]> = {};

  array.forEach(value => {
    const key = groupingFunction(value);
    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(value);
  })

  return result;
};

export const uniqueFrom = <R, T>(array: T[], valueFunction: (value: T) => R): R[] => {
  const uniqueValues: R[] = [];

  array.forEach(arrayElement => {
    const value = valueFunction(arrayElement);
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
    }
  })

  return uniqueValues;
}

export const uniqueBy = <R, T>(array: T[], valueFunction: (value: T) => R): T[] => {
  const uniqueValues: R[] = [];
  const uniqueElements: T[] = [];

  array.forEach(arrayElement => {
    const value = valueFunction(arrayElement);
    if (!uniqueValues.includes(value)) {
      uniqueValues.push(value);
      uniqueElements.push(arrayElement);
    }
  })

  return uniqueElements;
}

export const flatMap = <T> (array: T[][]): T[] => {
  const flatArray: T[] = [];
  array.forEach(value => flatArray.push(...value))
  return flatArray;
}

export const arrayToObject = <T, R> (array: T[] | null | undefined, propertyFunction: (entry: T) => string, mappingFunction: (entry: T) => R): Record<string, R> => {
  const result: Record<string, R> = {};
  if (!array) {
    return result;
  }

  array.forEach((entry) => {
    result[propertyFunction(entry)] = mappingFunction(entry);
  })

  return result;
}
