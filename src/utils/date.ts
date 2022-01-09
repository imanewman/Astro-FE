import { format, formatISO } from "date-fns";

import { dateFormat } from "./globals";

/**
 * Converts the given date string into a date object, or null if empty.
 *
 * @param isoString - The ISO date string to convert.
 * @return The parsed date, or null if the string is empty.
 */
export function parseDate(isoString: string): Date | null {
  return isoString
    ? new Date(isoString)
    : null;
}

/**
 * Converts the given iso date string into a formatted string.
 *
 * @param isoString - The ISO date string to convert.
 * @return The formatted date.
 */
export function stringifyDate(isoString: string): string {
  return isoString
    ? format(new Date(isoString), dateFormat)
    : "";
}

/**
 * Converts the given date into an ISO string, with no time zone change.
 *
 * @param date - The date string to convert.
 * @return The ISO date string.
 */
export function isoDate(date: Date): string {
  const iso = formatISO(date).split("-");

  iso.pop();

  return iso.join("-");
}

/**
 * Converts a date object to the seconds since midnight, January 1, 1970 UTC.
 *
 * @param date - The date object to convert.
 * @return The seconds timestamp.
 */
export function dateToSeconds(date: Date): number {
  return date.getTime() / 1000 + date.getTimezoneOffset() * 60;
}

/**
 * Returns a new date object by determining the UTC time from the given timezone.
 *
 * @param localDate - The local date.
 * @param timezone - The local timezone.
 * @return The UTC date.
 */
export function getUTCDateAndOffset(
  localDate: Date,
  { dstOffset, rawOffset }: Timezone,
): [Date, number] {
  const offsets = dstOffset * 1000 + rawOffset * 1000;

  return [new Date(localDate.getTime() - offsets), offsets];
}

/**
 * Returns a new UTC date string for the given local date with the given time offset.
 *
 * @param localDate - The local date.
 * @param offset - The local timezone offset.
 * @return The UTC date.
 */
export function getISODateStringFromOffset(
  localDate: Date | null,
  offset: number,
): string {
  if (!localDate) return "";

  const utcDate = new Date(localDate.getTime() - offset);

  return isoDate(utcDate);
}

export default {
  parseDate,
  stringifyDate,
  isoDate,
  dateToSeconds,
  getUTCDateAndOffset,
};
