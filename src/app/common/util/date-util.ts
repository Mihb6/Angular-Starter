import { DateTime } from 'luxon';

export const MILLISECONDS_IN_DAY = 86400000;
export const USERS_TIME_ZONE = DateTime.now().zone.name;
export const DEFAULT_TIME_ZONE = USERS_TIME_ZONE;

export const startOfTheDay = (dayOffSet?: number, timeZone?: string | null): number => {
  return DateTime.now()
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('day')
    .plus({ days: dayOffSet })
    .toMillis();
};

export const daysAway = (dayOffSet?: number, timeZone?: string | null): number => {
  return DateTime.now()
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('minute')
    .plus({ days: dayOffSet })
    .toMillis();
};

export const toStartOfTheDay = (millis: number, timeZone?: string | null): number => {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('day')
    .toMillis();
};

export function startOfWeek(weekOffset?: number, timeZone?: string | null): number {
  return DateTime.now()
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('week')
    .plus({ weeks: weekOffset })
    .toMillis();
}

export function toStartOfWeek(millis: number, timeZone?: string | null): number {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('week')
    .toMillis();
}

export function startOfMonth(monthOffset?: number, timeZone?: string | null): number {
  return DateTime.now()
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('month')
    .plus({ months: monthOffset })
    .toMillis();
}

export function toStartOfMonth(millis: number, timeZone?: string | null): number {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('month')
    .toMillis();
}

export function toEndOfMonth(millis: number, timeZone?: string | null): number {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .endOf('month')
    .toMillis();
}

export function startOfYear(yearOffset?: number, timeZone?: string | null): number {
  return DateTime.now()
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('year')
    .plus({ years: yearOffset })
    .toMillis();
}

export function toStartOfYear(millis: number, timeZone?: string | null): number {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .startOf('year')
    .toMillis();
}

export function toEndOfYear(millis: number, timeZone?: string | null): number {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .endOf('year')
    .toMillis();
}

export const toJsDate = (millis: number, timeZone?: string | null): Date => {
  return DateTime.fromMillis(millis)
    .setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE)
    .toJSDate();
};

export const toTime = (millis: number, timeZone?: string | null): { hour: number; minute: number; offset: string } => {
  const time = DateTime.fromMillis(millis).setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE);
  return { hour: time.hour, minute: time.minute, offset: time.offsetNameShort ?? '' };
};

export const toOffset = (timeZone?: string | null): string => {
  const time = DateTime.fromJSDate(new Date()).setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE);
  return time.offsetNameShort ?? '';
};

export const toDate = (millis: number, timeZone?: string | null): { day: number; month: number; year: number; offset: string } => {
  const time = DateTime.fromMillis(millis).setZone(timeZone ? timeZone : DEFAULT_TIME_ZONE);
  return { day: time.day, month: time.month, year: time.year, offset: time.offsetNameShort ?? '' };
};

export function parseTimeInput(date: Date, timeInput: string, timezone?: string): number {
  if (!date || !timeInput || !timeInput.includes(':')) {
    return date?.getTime() ?? 0;
  }

  const localMidnight = toStartOfTheDay(date.getTime(), timezone);

  const hoursAndMinutes = timeInput.split(':').map((value) => Number.parseInt(value));

  const hours = hoursAndMinutes[0] * 1000 * 60 * 60;
  const minutes = hoursAndMinutes[1] * 1000 * 60;

  return localMidnight + hours + minutes;
}

export function format(millis: number, locale: string, format?: string): string {
  if (format) {
    return DateTime.fromMillis(millis).toFormat(format, { locale: locale });
  } else {
    return DateTime.fromMillis(millis).toLocaleString({}, { locale: locale });
  }
}

export enum RelativeTimePeriod {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  TOMORROW = 'TOMORROW',
  LAST_24_HOURS = 'LAST_24_HOURS',
  LAST_7_DAYS = 'LAST_7_DAYS',
  NEXT_7_DAYS = 'NEXT_7_DAYS',
  THIS_WEEK = 'THIS_WEEK',
  LAST_30_DAYS = 'LAST_30_DAYS',
  NEXT_30_DAYS = 'NEXT_30_DAYS',
  THIS_MONTH = 'THIS_MONTH',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  LAST_12_MONTHS = 'LAST_12_MONTHS',
  NEXT_12_MONTHS = 'NEXT_12_MONTHS',
  THIS_YEAR = 'THIS_YEAR',
}

export const RELATIVE_TIME_PERIODS = Object.keys(RelativeTimePeriod) as RelativeTimePeriod[];

export const startOfPeriod: (timezone?: string | null) => { [key in RelativeTimePeriod]: number } = (timezone) => ({
  [RelativeTimePeriod.TODAY]: startOfTheDay(undefined, timezone),
  [RelativeTimePeriod.YESTERDAY]: startOfTheDay(-1, timezone),
  [RelativeTimePeriod.TOMORROW]: startOfTheDay(+1, timezone),
  [RelativeTimePeriod.LAST_24_HOURS]: daysAway(-1, timezone),
  [RelativeTimePeriod.LAST_7_DAYS]: startOfTheDay(-7, timezone),
  [RelativeTimePeriod.NEXT_7_DAYS]: startOfTheDay(undefined, timezone),
  [RelativeTimePeriod.THIS_WEEK]: startOfWeek(undefined, timezone),
  [RelativeTimePeriod.LAST_30_DAYS]: startOfTheDay(-30, timezone),
  [RelativeTimePeriod.NEXT_30_DAYS]: startOfTheDay(undefined, timezone),
  [RelativeTimePeriod.THIS_MONTH]: startOfMonth(undefined, timezone),
  [RelativeTimePeriod.LAST_6_MONTHS]: startOfMonth(-6, timezone),
  [RelativeTimePeriod.LAST_12_MONTHS]: startOfTheDay(-365, timezone),
  [RelativeTimePeriod.NEXT_12_MONTHS]: startOfTheDay(undefined, timezone),
  [RelativeTimePeriod.THIS_YEAR]: startOfYear(undefined, timezone),
});

export const endOfPeriod: (timezone: string | null) => { [key in RelativeTimePeriod]: number } = (timezone) => ({
  [RelativeTimePeriod.TODAY]: startOfTheDay(+1, timezone),
  [RelativeTimePeriod.YESTERDAY]: startOfTheDay(undefined, timezone),
  [RelativeTimePeriod.TOMORROW]: startOfTheDay(+2, timezone),
  [RelativeTimePeriod.LAST_24_HOURS]: daysAway(+0, timezone),
  [RelativeTimePeriod.LAST_7_DAYS]: startOfTheDay(+1, timezone),
  [RelativeTimePeriod.NEXT_7_DAYS]: startOfTheDay(+7, timezone),
  [RelativeTimePeriod.THIS_WEEK]: startOfWeek(+1, timezone),
  [RelativeTimePeriod.LAST_30_DAYS]: startOfTheDay(+1, timezone),
  [RelativeTimePeriod.NEXT_30_DAYS]: startOfTheDay(+30, timezone),
  [RelativeTimePeriod.THIS_MONTH]: startOfMonth(+1, timezone),
  [RelativeTimePeriod.LAST_6_MONTHS]: startOfTheDay(+1, timezone),
  [RelativeTimePeriod.LAST_12_MONTHS]: startOfTheDay(+1, timezone),
  [RelativeTimePeriod.NEXT_12_MONTHS]: startOfTheDay(+365, timezone),
  [RelativeTimePeriod.THIS_YEAR]: startOfYear(+1, timezone),
});
