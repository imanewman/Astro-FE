import { add } from "date-fns";

import {
  defaultAspects, defaultNatalPoints, defaultTransitPoints, isoDate,
} from "@utils";
import { cloneEvent, createCurrentTransitsEvent, createNewEvent } from "./event";

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
 @returns Event settings for a natal chart.
 */
export function createNatalEventSettings(event: EventModel, doClone = false): EventSettingsModel {
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
 @returns Event settings for transits.
 */
export function createTransitEventSettings(event: EventModel, doClone = false): EventSettingsModel {
  return createEventSettings(
    event,
    [{
      points: defaultTransitPoints,
      aspects: defaultAspects,
    }],
    doClone,
  );
}

export function createTransitSettings(): TransitSettingsModel {
  const transitEventSettings = createTransitEventSettings(createCurrentTransitsEvent(), true);

  const incrementDate = (date: string) =>
    isoDate(add(new Date(date), { days: 3 }));

  return {
    type: "Transit To Chart",
    event: {
      ...transitEventSettings.event,
      localEndDate: incrementDate(transitEventSettings.event.localDate),
      utcEndDate: incrementDate(transitEventSettings.event.utcDate),
    },
    enabled: transitEventSettings.enabled,
  };
}

export default { createEventSettings };
