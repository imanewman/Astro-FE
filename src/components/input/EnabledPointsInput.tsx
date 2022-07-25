import React from "react";

import {
  Button, Divider, IconButton, Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { EnabledPointsInputProps, EnabledPointsItemProps } from "@typedefs";
import { useArray, useBaseContext, usePrimitive } from "@hooks";
import {
  AspectMultiselectInput, Box, PointMultiselectInput, Accordion,
} from "@components";

/**
 * Renders one item in the enabled points list.
 * @param props - Component Props.
 * @constructor
 */
function EnabledItem(props:EnabledPointsItemProps) {
  const { item, onSubmit, onRemove } = props;
  const points = usePrimitive(item, "points");
  const aspects = usePrimitive(item, "aspects");

  return (
    <Box gapY={1} alignX="center">
      <Divider />

      <Box fullWidth row alignY="center">
        <Box fullWidth gapY={1}>
          <PointMultiselectInput
            fullWidth
            label="Points"
            attribute={points}
            onBlur={onSubmit}
          />
          <AspectMultiselectInput
            fullWidth
            label="Aspects"
            attribute={aspects}
            onBlur={onSubmit}
          />
        </Box>
        <Tooltip title="Remove Set">
          <IconButton color="error" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

/**
 * Renders a list of inputs for changing the enabled points.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Enabled Points Input
 */
export default function EnabledPointsInput(props: EnabledPointsInputProps) {
  const { eventSettings } = props;
  const { reloadLiveChart } = useBaseContext();
  const enabled = useArray(usePrimitive(eventSettings, "enabled"), true);

  const handleCreate = () => {
    enabled.addItem({ points: [] });
  };

  const handleRemove = (index: number) => () => {
    enabled.removeItem(index);
    reloadLiveChart();
  };

  return (
    <Accordion name="Enabled Points">
      <Box gapY={1}>
        {enabled.value?.map((item, index) => (
          <EnabledItem
            key={String(index)}
            item={item}
            onRemove={handleRemove(index)}
            onSubmit={reloadLiveChart}
          />
        ))}
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Create New Enabled Set
        </Button>
      </Box>
    </Accordion>
  );
}
