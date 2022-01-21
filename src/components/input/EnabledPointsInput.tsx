import React from "react";

import {
  Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography,
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
  const {
    index, item, onSubmit, onRemove,
  } = props;
  const points = usePrimitive(item, "points");
  const aspects = usePrimitive(item, "aspects");

  return (
    <Box key={index} gapY={1} alignX="center">
      <Divider />
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
      <Button
        fullWidth
        startIcon={<DeleteIcon />}
        onClick={onRemove}
        color="error"
      >
        Remove Set
      </Button>
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

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Enabled Points</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box gapY={1}>
          {enabled.value?.map((item, index) => (
            <EnabledItem
              index={index}
              item={item}
              onRemove={() => enabled.removeItem(index)}
              onSubmit={reloadLiveChart}
            />
          ))}
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Create Enabled Set
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
