import React from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useBaseContext, useRelationships } from "@hooks";
import { Box, SelectInput } from "@components";
import AspectTableGrid from "./AspectTableGrid";
import VisiblePoints from "./VisiblePoints";
import VisibleAspects from "./VisibleAspects";

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
      <Box row wrap gapX={1} alignItems="center">
        <SelectInput
          label="Aspects Between"
          options={collectionNames}
          attribute={selectedName}
          sx={{ minWidth: 120 }}
        />
        <VisiblePoints attribute={visiblePoints} />
        <VisibleAspects attribute={visibleAspects} />
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
