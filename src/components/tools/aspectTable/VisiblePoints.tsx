import React from "react";

import { allPoints, getPointType } from "@utils";
import { MultiselectInput } from "@components";

/**
 * Renders a selector for changing the visible points.
 *
 * @constructor
 * @visibleName Visible Points
 */
export default function VisiblePoints(props: VisibleProps) {
  const { attribute } = props;

  return (
    <MultiselectInput
      label="Visible Points"
      options={allPoints}
      groupBy={(option) => getPointType(option)}
      attribute={attribute}
      limitTags={1}
      sx={{ width: 280 }}
    />
  );
}
