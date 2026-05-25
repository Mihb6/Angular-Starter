export function determineMinMaxValues(values: number[], paddingPercentage?: number): { min: number; max: number } {
  if (values.length === 0) {
    return { min: 0, max: 0 };
  }

  const minValue = values.reduce((a, b) => (a <= b ? a : b));
  const maxValue = values.reduce((a, b) => (a >= b ? a : b));

  if (!paddingPercentage) {
    return { min: minValue, max: maxValue }
  }

  const padding = maxValue === minValue ? minValue / paddingPercentage : (maxValue - minValue) / paddingPercentage;
  const magnitude = determineMagnitude(padding);

  if (magnitude < 0) {
    return { min: scale(minValue - padding, -magnitude), max: scale(maxValue + padding, -magnitude) };
  } else {
    return { min: Math.floor(minValue - padding), max: Math.floor(maxValue + padding) };
  }
}

/**
 * Determines the magnitude of the number.
 *
 * ...
 * 100 - 999 -> 2
 * 10 - 99 -> 1
 * 0 - 9 -> 0
 * 0.1 - 0.9999999999... -> -1
 * 0.01 - 0.0999999... -> -2
 * ...
 */
export const determineMagnitude = (value: number): number => {
  if (value === 0) return 0;
  return value < 1 ? -Math.ceil(-(Math.log10(value))) : Math.floor(Math.log10(value));
}

export const scale = (value: number, precision: number): number => {
  return Number(value.toFixed(precision));
}
