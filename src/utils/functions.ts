import { format } from "date-fns";
import { dateFormat } from "./globals";

/**
 * Returns true if the local time is between 6PM and 6AM
 */
export function isNightTime(): boolean {
  const militaryHours = new Date(Date.now()).getHours();

  return militaryHours <= 6 || militaryHours >= 18;
}

/**
 * Fills in path variables and query parameters to a given route.
 * @param route - A route string to navigate to.
 * @param pathVars - Any path variables to fill in on the given route.
 * @param queryParams - Any query params to attach to the route.
 */
export function fillRoute(
  route: string,
  pathVars?: { [name: string]: string },
  queryParams?: { [name: string]: string },
): string {
  let fullRoute = route;

  if (pathVars) {
    Object.entries(pathVars).forEach(([key, val]) => {
      fullRoute = route.replace(`:${key}`, val);
    });
  }

  if (queryParams) {
    fullRoute = `${route}?${new URLSearchParams(queryParams)}`;
  }

  return fullRoute;
}

/**
 * Converts the given date string into a date object, or null if empty.
 *
 * @param isoString - The ISO date string to convert.
 */
export function parseDate(isoString: string): Date | null {
  return isoString
    ? new Date(isoString)
    : null;
}

/**
 * Converts the given date string into a date object, or null if empty.
 *
 * @param isoString - The ISO date string to convert.
 */
export function stringifyDate(isoString: string): string {
  return isoString
    ? format(new Date(isoString), dateFormat)
    : "";
}

/**
 * Returns a generated unique ID.
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 22);
}

/**
 * Converts a date object tot eh seconds since midnight, January 1, 1970 UTC.
 *
 * @param date - The date object to convert.
 */
export function dateToSeconds(date: Date): number {
  return date.getTime() / 1000 + date.getTimezoneOffset() * 60;
}

export default { isNightTime, fillRoute, parseDate };
