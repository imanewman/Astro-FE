import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatAspectMovement, formatAspectOrb } from "@utils";

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
      field: "fromPoint",
      headerName: fromEventType,
      minWidth: 120,
    },
    {
      field: "toPoint",
      headerName: toEventType,
      minWidth: 120,
    },
    {
      field: "movement",
      headerName: "Movement",
      minWidth: 150,
    },
    {
      field: "aspect",
      headerName: "Aspect",
      minWidth: 120,
    },
    {
      field: "orb",
      headerName: "Orb",
      minWidth: 160,
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
      const aspects: JsonObject[] = [];

      if (rel.eclipticAspect.type) {
        aspects.push({
          id: `${rel.fromPoint}-${rel.toPoint}`,
          fromPoint: rel.fromPoint,
          toPoint: rel.toPoint,
          aspect: rel.eclipticAspect.type,
          movement: formatAspectMovement(rel, "ecliptic"),
          orb: formatAspectOrb(rel, "ecliptic"),
        });
      }

      if (rel.declinationAspect.type) {
        aspects.push({
          id: `${rel.fromPoint}-${rel.toPoint}-declination`,
          fromPoint: rel.fromPoint,
          toPoint: rel.toPoint,
          aspect: rel.declinationAspect.type,
          movement: formatAspectMovement(rel, "declination"),
          orb: formatAspectOrb(rel, "declination"),
        });
      }

      return aspects;
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
    <div style={{ height: 600, width: 820 }}>
      <DataGrid
        columns={columns}
        rows={aspects}
      />
    </div>
  );
}
