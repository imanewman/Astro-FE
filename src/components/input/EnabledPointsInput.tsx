import React from "react";

import {
  Accordion, AccordionDetails, AccordionSummary, Button, Divider, IconButton, Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { EnabledPointsInputProps, EnabledPointsItemProps } from "@typedefs";
import { useArray, useBaseContext, usePrimitive } from "@hooks";
import { AspectMultiselectInput, Box, PointMultiselectInput } from "@components";

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
        <PointMultiselectInput
          fullWidth
          label="Points"
          attribute={points}
          onBlur={onSubmit}
        />
        <Tooltip title="Remove Set">
          <IconButton color="error" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <AspectMultiselectInput
        fullWidth
        label="Aspects"
        attribute={aspects}
        onBlur={onSubmit}
      />
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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Enabled Points</Typography>
      </AccordionSummary>

      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
}
