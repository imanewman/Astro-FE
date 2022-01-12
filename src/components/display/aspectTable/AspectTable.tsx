import React, { useEffect, useState } from "react";
import { useBaseContext } from "@hooks";
import { Box, SelectInput } from "@components";
import { CircularProgress, Typography } from "@mui/material";
import AspectTableGrid from "./AspectTableGrid";

/**
 * Renders a aspect table for any loaded collections of aspects.
 *
 * @constructor
 * @visibleName Aspect Table
 */
export default function AspectTable() {
  const { liveData, liveChartError, liveChartLoading } = useBaseContext();
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const collection = liveData?.relationships[currentIndex];
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
      setCollectionNames(
        liveData.relationships.map(({ fromChartIndex, toChartIndex }) => {
          const firstChart = liveData.charts[fromChartIndex].event.name;
          const secondChart = liveData.charts[toChartIndex || fromChartIndex].event.name;

          return `${firstChart} & ${secondChart}`;
        }),
      );

      if (currentIndex > liveData.relationships.length) {
        setCurrentIndex(0);
      }
    } else {
      setCollectionNames([]);
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
      {collection && (
        <AspectTableGrid collection={collection} />
      )}
      {liveChartError && (
        <Typography color="error">{liveChartError}</Typography>
      )}
    </Box>
  );
}
