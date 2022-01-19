import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stringifyDate } from "@utils";

/**
 * Creates header column definitions for the chart.
 *
 * @param fromEventType - The starting event type.
 * @param toEventType - The ending event type.
 */
function createColumns(
  fromEventType: string,
  toEventType: string,
): GridColDef[] {
  return [
    {
      field: "toPoint",
      headerName: toEventType,
      minWidth: 120,
    },
    {
      field: "aspect",
      headerName: "Aspect",
      minWidth: 120,
    },
    {
      field: "fromPoint",
      headerName: fromEventType,
      minWidth: 120,
    },
    {
      field: "movement",
      headerName: "Movement",
      minWidth: 150,
    },
    {
      field: "dateExact",
      headerName: "Date Exact",
      flex: 1,
    },
  ];
}

/**
 * Creates an array of aspects in the collection.
 *
 * @param relationships - The relationships to convert.
 * @return The created aspects.
 */
function createAspects(
  relationships: RelationshipModel[],
): JsonObject[] {
  return relationships
    .map((rel) => {
      const formattedMovement = rel.eclipticAspect.movement || "";
      const formattedPcMovement = rel.precessionCorrectedAspect.movement || "";
      const movement = !formattedPcMovement || formattedMovement === formattedPcMovement
        ? formattedMovement
        : `${formattedMovement} [${formattedPcMovement}]`;

      const formattedDate = stringifyDate(rel.eclipticAspect.localDateOfExact);
      const formattedPcDate = stringifyDate(rel.precessionCorrectedAspect.localDateOfExact);
      const formattedPcTime = formattedPcDate.split(" ").slice(1).join(" ");
      const day = formattedDate.split(" ")[0].split("/")[2] || "";
      const pcDay = formattedPcDate.split(" ")[0].split("/")[2] || "";
      const pcExact = day === pcDay ? formattedPcTime : formattedPcDate;
      const dateExact = pcExact ? `${formattedDate} [${pcExact}]` : formattedDate;

      const eclipticAspect = {
        id: `${rel.fromPoint}-${rel.toPoint}`,
        fromPoint: rel.fromPoint,
        aspect: rel.eclipticAspect.type || rel.precessionCorrectedAspect.type,
        toPoint: rel.toPoint,
        movement,
        dateExact,
      };

      const declinationAspect = rel.declinationAspect.type && {
        id: `${rel.fromPoint}-${rel.toPoint}-declination`,
        fromPoint: rel.fromPoint,
        aspect: rel.declinationAspect.type,
        toPoint: rel.toPoint,
        movement: rel.declinationAspect.movement,
        dateExact: stringifyDate(rel.declinationAspect.localDateOfExact),
      };

      return declinationAspect ? [eclipticAspect, declinationAspect] : [eclipticAspect];
    })
    .reduce((acc, cur) => [...acc, ...cur], []);
}

/**
 * Renders a table of aspects.
 *
 * @constructor
 * @visibleName Aspect Table Grid
 */
export default function AspectTableGrid(props: AspectTableProps) {
  const { collection, visibleRelationships } = props;
  const [aspects, setAspects] = useState<JsonObject[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);

  useEffect(() => {
    setAspects(createAspects(visibleRelationships));
    setColumns(createColumns(collection.fromChartType, collection.toChartType));
  }, [visibleRelationships]);

  return (
    <div style={{ height: 600, width: 800 }}>
      <DataGrid
        columns={columns}
        rows={aspects}
      />
    </div>
  );
}
