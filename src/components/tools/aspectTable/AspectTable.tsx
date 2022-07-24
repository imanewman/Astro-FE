import React from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useBaseContext, useRelationships } from "@hooks";
import {
  AspectMultiselectInput, Box, PointMultiselectInput, SelectInput,
} from "@components";
import AspectTableGrid from "./AspectTableGrid";

/**
 * Renders an aspect table for any loaded collections of aspects.
 *
 * @constructor
 * @visibleName Aspect Table
 */
export default function AspectTable() {
  const { liveChartError, liveChartLoading } = useBaseContext();
  const {
    collection, collectionNames, selectedName,
    visiblePoints, visibleAspects,
    visibleRelationships,
  } = useRelationships();

  return (
    <Box>
      <Box row wrap gapX={1} alignItems="center" mb={1}>
        <SelectInput
          label="Aspects Between"
          options={collectionNames}
          attribute={selectedName}
          sx={{ minWidth: 120 }}
        />

        <PointMultiselectInput
          label="Visible Points"
          attribute={visiblePoints}
          sx={{ minWidth: 260 }}
        />

        <AspectMultiselectInput
          label="Visible Aspects"
          attribute={visibleAspects}
          sx={{ minWidth: 260 }}
        />

        {liveChartLoading && (
          <CircularProgress style={{ marginLeft: 10 }} />
        )}
      </Box>
      {collection && (
        <AspectTableGrid
          collection={collection}
          visibleRelationships={visibleRelationships}
        />
      )}
      {liveChartError && (
        <Typography color="error">{String(liveChartError)}</Typography>
      )}
    </Box>
  );
}
