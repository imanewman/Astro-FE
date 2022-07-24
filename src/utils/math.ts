/**
 * Converts degrees to the minutes within the current degree.
 *
 * @param degrees - Degrees as a float.
 * @param asInt - Whether to return the minutes as a floored int.
 * @return The minutes out of 60 within the current degree.
 */
export function degreesToMinutes(degrees: number, asInt = true): number {
  const fractionOfDegree = degrees % 1;
  const minutesPerDegree = 60;
  const minutes = fractionOfDegree * minutesPerDegree;

  return asInt ? Math.floor(minutes) : minutes;
}

/**
 * Converts degrees to the seconds within the current minute.
 *
 * @param degrees - Degrees as a float.
 * @param asInt - Whether to return the seconds as a floored int.
 * @return The minutes out of 60 within the current minute.
 */
export function degreesToSeconds(degrees: number, asInt = true): number {
  const fractionOfMinutes = degreesToMinutes(degrees, false) % 1;
  const secondsPerMinute = 60;
  const seconds = fractionOfMinutes * secondsPerMinute;

  return asInt ? Math.floor(seconds) : seconds;
}
