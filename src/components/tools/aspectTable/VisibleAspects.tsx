import React from "react";

import { allAspects, getAspectType } from "@utils";
import { MultiselectInput } from "@components";

/**
 * Renders a selector for changing the visible aspects.
 *
 * @constructor
 * @visibleName Visible Aspects
 */
export default function VisibleAspects(props: VisibleProps) {
  const { attribute } = props;

  return (
    <MultiselectInput
      label="Visible Aspects"
      options={allAspects}
      groupBy={(option) => getAspectType(option)}
      attribute={attribute}
      limitTags={1}
      sx={{ width: 280 }}
    />
  );
}
