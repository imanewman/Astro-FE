import React from "react";

import { Button, Typography } from "@mui/material";

import { getValueType } from "@utils";
import { Box, MultiselectInput } from "@components";

/**
 * Renders a selector for changing the visible points or aspects.
 *
 * @constructor
 * @visibleName Visible Multiselect
 */
export default function VisibleMultiselect(props: VisibleMultiselectProps) {
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
