import { TimeSeries, TimeSeriesData } from "../component/basic-time-series-graph/time-series";
import { Reading, SemanticFeedDetails } from "../../rest/data/semantic-feed.model";

export const convertToTimeSeries = (feed: SemanticFeedDetails, readings?: Reading[] | null): TimeSeries => {
  return {
    name: feed.name,
    unitGuid: feed.unitGuid,
    unitSymbol: feed.unitSymbol,
    data: convertToTimeSeriesData(readings)
  } as TimeSeries;
}

export const convertToTimeSeriesData = (readings: Reading[] | null | undefined): TimeSeriesData[] => {
  return readings?.map((reading) => {
    return {
      timestamp: reading.recordingTime,
      value: Number(reading.data)
    } as TimeSeriesData
  }) ?? []
}

// Group period is in minutes
export const groupReadings = (readings: Reading[] | null | undefined, groupPeriod: number): Reading[][] => {
  if (!Array.isArray(readings) || readings.length === 0) {
    return [];
  }

  if (!Number.isFinite(groupPeriod) || groupPeriod <= 0) {
    throw new Error('groupPeriod must be a positive finite number (ms).');
  }

  // Sort by recordingTime without mutating the input
  const sortedReadings = [...readings].sort((a, b) => a.recordingTime - b.recordingTime);

  // Bucket by floor(recordingTime / groupPeriod)
  const buckets = new Map<number, Reading[]>();

  const groupPeriodMillis = groupPeriod * 60_000;

  for (const reading of sortedReadings) {
    const time = reading?.recordingTime;
    if (!Number.isFinite(time)) {
      continue;
    }

    const bucketStart = Math.floor(time / groupPeriodMillis) * groupPeriodMillis;

    const bucket = buckets.get(bucketStart);
    if (bucket) {
      bucket.push(reading);
    } else {
      buckets.set(bucketStart, [reading]);
    }
  }

  return Array.from(buckets.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, group]) => group);
}

/**
 * timestamp - The timestamp of the earliest reading in the list
 * min - Minimal reading value in the list
 * low - 25th percentile
 * high - 75% percentile
 * max - The maximum reading value in the list
 */
export const getStatistics = (readings: Reading[] | null | undefined): { timestamp: number, min: number, low: number, high: number, max: number} => {
  if (!Array.isArray(readings) || readings.length === 0) {
    return { timestamp: NaN, min: NaN, low: NaN, high: NaN, max: NaN };
  }

  // Extract numeric values from data (skip non-numeric)
  const values = readings
    .map(r => parseFloat(r.data))
    .filter(v => Number.isFinite(v))
    .sort((a, b) => a - b); // sort ascending

  if (values.length === 0) {
    return { timestamp: NaN, min: NaN, low: NaN, high: NaN, max: NaN };
  }

  return {
    timestamp: Math.min(...readings.map(r => r.recordingTime)),
    min: values[0],
    low: percentile(values, 0.25),
    high: percentile(values, 0.75),
    max: values[values.length - 1]
  };
}

// Percentile helper
const percentile = (array: number[], p: number) => {
  if (array.length === 0) {
    return NaN;
  }

  if (array.length === 1) {
    return array[0];
  }

  const index = (array.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) {
    return array[lower];
  } else {
    return array[lower] + (array[upper] - array[lower]) * (index - lower);
  }
};
