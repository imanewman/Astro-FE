import { degreesToMinutes, degreesToSeconds } from "./math";

/**
 * Creates a formatted aspect movement string for this relationship.
 * For ecliptic aspects, precession corrected movement will be included if it exists.
 *
 * @param rel - The relationship to print from.
 * @param type - The type of aspect movement to display.
 * @return The display string for the aspect's movement.
 */
export function formatAspectMovement(
  rel: RelationshipModel, type: "ecliptic" | "declination",
): string {
  if (type === "declination") {
    return rel.declinationAspect.movement || "";
  }

  const formatted = rel.eclipticAspect.movement || "";
  const formattedPc = rel.precessionCorrectedAspect.movement || "";
  const excludePc = !formattedPc || formatted === formattedPc;

  return excludePc ? formatted : `${formatted} [${formattedPc}]`;
}

/**
 * Formats an orb from a float to its degrees and minutes
 *
 * @param orb - The orb to display, in degrees.
 * @param includeSeconds - Whether to display the orb's seconds.
 * @return The display string for the orb.
 */
export function formatOrb(orb: number | null, includeSeconds = false): string {
  if (orb === null) {
    return "";
  }

  const degrees = Math.floor(orb);
  const minutes = degreesToMinutes(orb);
  const seconds = degreesToSeconds(orb);

  return includeSeconds
    ? `${degrees}° ${minutes}' ${seconds}''`
    : `${degrees}° ${minutes}'`;
}

/**
 * Creates a formatted aspect orb string for this relationship.
 * For ecliptic aspects, precession corrected orb will be included if it exists.
 *
 * @param rel - The relationship to print from.
 * @param type - The type of aspect orb to display.
 * @return The display string for the aspect's orb.
 */
export function formatAspectOrb(rel: RelationshipModel, type: "ecliptic" | "declination"): string {
  if (type === "declination") {
    return formatOrb(rel.declinationAspect.orb);
  }

  const formatted = formatOrb(rel.eclipticAspect.orb);
  const formattedPc = formatOrb(rel.precessionCorrectedAspect.orb);
  const excludePc = !formattedPc || formatted === formattedPc;

  return excludePc ? formatted : `${formatted} (${formattedPc} PC)`;
}

// const formattedDate = stringifyDate(rel.eclipticAspect.localDateOfExact);
// const formattedPcDate = stringifyDate(rel.precessionCorrectedAspect.localDateOfExact);
// const formattedPcTime = formattedPcDate.split(" ").slice(1).join(" ");
// const day = formattedDate.split(" ")[0].split("/")[1] || "";
// const pcDay = formattedPcDate.split(" ")[0].split("/")[1] || "";
// const pcExact = day === pcDay ? formattedPcTime : formattedPcDate;
// const dateExact = pcExact ? `${formattedDate} [${pcExact}]` : formattedDate;
