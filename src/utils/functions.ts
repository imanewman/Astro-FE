/**
 * Returns true if the local time is between 6PM and 6AM
 */
import { parse } from "date-fns";
import { dateFormat } from "./globals";

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
 * @param dateString - The date string to convert.
 */
export function parseDate(dateString: string): Date | null {
  return dateString
    ? parse(dateString, dateFormat, new Date())
    : null;
}

/**
 * Returns a generated unique ID.
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 22);
}

export default { isNightTime, fillRoute, parseDate };
