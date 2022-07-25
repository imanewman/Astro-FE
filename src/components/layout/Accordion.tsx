import React, { useState } from "react";

import {
  Accordion as MuiAccordion, AccordionDetails, AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AccordionProps } from "@typedefs";

/**
 * Renders a simple accordion.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Transit Inputs
 */
export default function Accordion(props: AccordionProps) {
  const { name, children, defaultExpanded } = props;
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  return (
    <MuiAccordion expanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography>{name}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {children}
      </AccordionDetails>
    </MuiAccordion>
  );
}
