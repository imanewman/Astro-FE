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
      width: 110,
    },
    {
      field: "dateExact",
      headerName: "Date Exact",
      width: 160,
    },
    {
      field: "movementPC",
      headerName: "PC Movement",
      width: 110,
    },
    {
      field: "dateExactPC",
      headerName: "PC Date Exact",
      width: 160,
    },
  ];
}

/**
 * Creates an array of aspects in the collection.
 *
 * TODO: remove filer. Extract out conversion to grid data format.
 *
 * @param relationships - The relationships to convert.
 * @return The created aspects.
 */
function createAspects(
  relationships: RelationshipModel[],
): JsonObject[] {
  return relationships
    .map((rel) => {
      const base = {
        id: `${rel.fromPoint}-${rel.toPoint}`,
        fromPoint: rel.fromPoint,
        aspect: rel.eclipticAspect.type || rel.precessionCorrectedAspect.type,
        toPoint: rel.toPoint,
        movement: rel.eclipticAspect.movement,
        dateExact: stringifyDate(rel.eclipticAspect.localDateOfExact),
        movementPC: rel.precessionCorrectedAspect.movement,
        dateExactPC: stringifyDate(rel.precessionCorrectedAspect.localDateOfExact),
      };

      return rel.declinationAspect.type ? [
        base,
        {
          ...base,
          id: `${rel.fromPoint}-${rel.toPoint}-declination`,
          movement: rel.declinationAspect.movement,
          dateExact: stringifyDate(rel.declinationAspect.localDateOfExact),
          movementPC: "",
          dateExactPC: "",
        },
      ] : [base];
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
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={aspects}
      />
    </div>
  );
}
