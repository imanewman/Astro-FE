import React from "react";

import { Button, Typography } from "@mui/material";

import {
  allAspects, allPoints, aspectsByType, getValueType, pointsByType,
} from "@utils";
import { Box, MultiselectInput } from "@components";

/**
 * Renders a selector for changing a list of points or aspects.
 *
 * @constructor
 * @visibleName Grouped Multiselect
 */
export default function GroupedMultiselectInput(props: GroupedMultiselectProps) {
  const {
    label, attribute, options, optionsByType,
  } = props;

  const handleGroupDisable = (group: string) => {
    const groupPoints: string[] = optionsByType[group];

    attribute.setValue(
      attribute.value.filter((point) => !groupPoints.includes(point)),
    );
  };

  return (
    <MultiselectInput
      label={label}
      options={options}
      groupBy={(option) => getValueType(option, optionsByType)}
      attribute={attribute}
      limitTags={1}
      sx={{ width: 280 }}
      renderGroup={({ key, group, children }) => (
        <Box key={key}>
          <Box m={1} row spaceBetween alignY="center">
            <Typography variant="subtitle1">{group}</Typography>
            <Button variant="text" onClick={() => handleGroupDisable(group)}>
              Disable All
            </Button>
          </Box>
          {children}
        </Box>
      )}
    />
  );
}

/**
 * Renders a multiselect for points.
 *
 * @param props - Component props.
 * @constructor
 */
export function PointMultiselectInput(
  props: Omit<GroupedMultiselectProps, "options" | "optionsByType">,
) {
  return (
    <GroupedMultiselectInput
      {...props}
      options={allPoints}
      optionsByType={pointsByType}
    />
  );
}

/**
 * Renders a multiselect for aspects.
 *
 * @param props - Component props.
 * @constructor
 */
export function AspectMultiselectInput(
  props: Omit<GroupedMultiselectProps, "options" | "optionsByType">,
) {
  return (
    <GroupedMultiselectInput
      {...props}
      options={allAspects}
      optionsByType={aspectsByType}
    />
  );
}
