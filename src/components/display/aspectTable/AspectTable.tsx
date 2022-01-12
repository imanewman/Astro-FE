import React, { useEffect, useState } from "react";
import { useBaseContext } from "@hooks";
import { Box, SelectInput } from "@components";
import { CircularProgress, Typography } from "@mui/material";
import AspectTableGrid from "./AspectTableGrid";

/**
 * Creates event summaries for each set of relationships.
 *
 * @param data - The chart data.
 * @return The created summaries.
 */
function getRelationshipSummaries(
  data: ChartCollectionModel,
): RelationshipSummary[] {
  return data.relationships.map(({ fromChartIndex, toChartIndex }) => {
    const fromEvent = data.charts[fromChartIndex].event;
    const toEvent = data.charts[toChartIndex || fromChartIndex].event;

    return {
      fromEvent,
      toEvent,
      name: `${fromEvent.name} & ${toEvent.name}`,
    };
  });
}

/**
 * Renders an aspect table for any loaded collections of aspects.
 *
 * @constructor
 * @visibleName Aspect Table
 */
export default function AspectTable() {
  const { liveData, liveChartError, liveChartLoading } = useBaseContext();
  const [summaries, setSummaries] = useState<RelationshipSummary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const collection = liveData?.relationships[currentIndex];
  const summary = summaries[currentIndex];
  const collectionNames = summaries.map(({ name }) => name);
  const collectionName = collectionNames[currentIndex] || "";

  const attribute = {
    value: collectionName,
    setValue(name: string) {
      const collectionIndex = collectionNames.indexOf(name);

      setCurrentIndex(collectionIndex);
    },
  };

  useEffect(() => {
    if (liveData) {
      setSummaries(getRelationshipSummaries(liveData));

      if (currentIndex > liveData.relationships.length) {
        setCurrentIndex(0);
      }
    } else {
      setSummaries([]);
    }
  }, [liveData]);

  return (
    <Box>
      <Box row>
        <SelectInput
          label="Aspects Between"
          options={collectionNames}
          attribute={attribute}
        />
        {liveChartLoading && (
          <CircularProgress style={{ marginLeft: 20 }} />
        )}
      </Box>
      {collection && summary && (
        <AspectTableGrid collection={collection} summary={summary} />
      )}
      {liveChartError && (
        <Typography color="error">{liveChartError}</Typography>
      )}
    </Box>
  );
}
