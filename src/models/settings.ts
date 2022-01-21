import { defaultAspects, defaultNatalPoints, defaultTransitPoints } from "@utils";
import { cloneEvent, createNewEvent } from "./event";

/**
 * @returns Event settings for an event.
 */
export function createEventSettings(
  event: EventModel = createNewEvent(),
  enabled?: EnabledPointsModel[],
  doClone = false,
): EventSettingsModel {
  return {
    event: doClone ? cloneEvent(event) : event,
    enabled,
  };
}

/**
 * TODO: delete once event settings are editable.
 */
export function createNatalSettings(event: EventModel, doClone = false): EventSettingsModel {
  return createEventSettings(
    event,
    [{
      points: defaultNatalPoints,
      aspects: defaultAspects,
    }],
    doClone,
  );
}

/**
 * TODO: delete once event settings are editable.
 */
export function createTransitSettings(event: EventModel, doClone = false): EventSettingsModel {
  return createEventSettings(
    event,
    [{
      points: defaultTransitPoints,
      aspects: defaultAspects,
    }],
    doClone,
  );
}

export default { createEventSettings };
