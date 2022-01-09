/**
 * @returns True if the local time is between 6PM and 6AM.
 */
export function isNightTime(): boolean {
  const militaryHours = new Date(Date.now()).getHours();

  return militaryHours <= 6 || militaryHours >= 18;
}

/**
 * Fills in path variables and query parameters to a given route.
 *
 * @param route - A route string to navigate to.
 * @param pathVars - Any path variables to fill in on the given route.
 * @param queryParams - Any query params to attach to the route.
 * @return The filled in path string.
 */
export function fillRoute(
  route: string,
  pathVars?: Record<string, string>,
  queryParams?: Record<string, string>,
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
 * @returns A generated unique ID.
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 22);
}

export default {
  isNightTime,
  fillRoute,
  generateUniqueId,
};
