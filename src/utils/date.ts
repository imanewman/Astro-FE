import { format, formatISO } from "date-fns";

import { dateFormat } from "./globals";

/**
 * Returns whether the given date is valid.
 *
 * @param date - The date to check.
 * @return Whether the date is valid.
 */
export function isDateValid(date: Date | null): date is Date {
  return !!date && date.toString() !== "Invalid Date";
}

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
export function stringifyDate(isoString: string | null): string {
  return isoString
    ? format(new Date(isoString), dateFormat)
    : "";
}

/**
 * Converts the given iso date and location into a formatted string.
 *
 * @param isoString - The ISO date string to convert.
 * @param location - The location.
 * @return The formatted date and location.
 */
export function stringifyDateAndLocation(isoString: string, location: string): string {
  return `${stringifyDate(isoString) || "New Date"} in ${location || "New Location"}`;
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
};
