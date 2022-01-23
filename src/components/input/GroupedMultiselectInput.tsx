import React from "react";

import {
  IconButton, Tooltip, Typography,
} from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { GroupedMultiselectProps } from "@typedefs";
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
    attribute,
    optionsByType,
    ...rest
  } = props;

  const handleGroupDisable = (group: string) => {
    const groupItems: string[] = optionsByType[group];

    attribute.setValue(
      (attribute.value || []).filter((point) => !groupItems.includes(point)),
    );
  };

  const handleGroupEnable = (group: string) => {
    const groupItems: string[] = optionsByType[group];
    const items = [...attribute.value || []];

    groupItems.forEach((item) => {
      if (!items.includes(item)) {
        items.push(item);
      }
    });

    attribute.setValue(items);
  };

  return (
    <MultiselectInput
      {...rest}
      groupBy={(option) => getValueType(option, optionsByType)}
      attribute={attribute}
      limitTags={1}
      renderGroup={({ key, group, children }) => (
        <Box key={key}>
          <Box m={1} row spaceBetween alignY="center">
            <Typography variant="subtitle1">
              {group}
            </Typography>
            <Box>
              <Tooltip title="Enable All">
                <IconButton onClick={() => handleGroupEnable(group)}>
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Disable All">
                <IconButton onClick={() => handleGroupDisable(group)}>
                  <DisabledByDefaultIcon />
                </IconButton>
              </Tooltip>
            </Box>
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
