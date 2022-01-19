import React from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useBaseContext, useRelationships } from "@hooks";
import { Box, SelectInput } from "@components";
import {
  allAspects, allPoints, aspectsByType, pointsByType,
} from "@utils";
import AspectTableGrid from "./AspectTableGrid";
import VisibleMultiselect from "./VisibleMultiselect";

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

        <VisibleMultiselect
          label="Visible Points"
          attribute={visiblePoints}
          options={allPoints}
          optionsByType={pointsByType}
        />

        <VisibleMultiselect
          label="Visible Aspects"
          attribute={visibleAspects}
          options={allAspects}
          optionsByType={aspectsByType}
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
        <Typography color="error">{liveChartError}</Typography>
      )}
    </Box>
  );
}
