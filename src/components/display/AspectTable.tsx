import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stringifyDate } from "@utils";

const columns: GridColDef[] = [
  {
    field: "fromPoint",
    headerName: "Natal",
  },
  {
    field: "aspect",
    headerName: "Aspect",
  },
  {
    field: "toPoint",
    headerName: "Transiting",
  },
  {
    field: "movement",
    headerName: "Movement",
    width: 140,
  },
  {
    field: "dateExact",
    headerName: "Date Exact",
    width: 160,
  },
  {
    field: "movementPC",
    headerName: "PC Movement",
    width: 140,
  },
  {
    field: "dateExactPC",
    headerName: "PC Date Exact",
    width: 160,
  },
];

/**
 * Renders a component.
 *
 * @constructor
 * @visibleName Aspect Table
 */
export default function AspectTable(props: AspectTableProps) {
  const { collection } = props;
  const [aspects, setAspects] = useState<JsonObject[]>([]);

  useEffect(() => {
    setAspects(
      collection.relationships
        .filter((rel) => rel.eclipticAspect.movement?.includes("Applying")
          || rel.precessionCorrectedAspect.movement?.includes("Applying"))
        .map((rel) => ({
          id: `${rel.fromPoint}-${rel.toPoint}`,
          fromPoint: rel.fromPoint,
          aspect: rel.eclipticAspect.type || rel.precessionCorrectedAspect.type,
          toPoint: rel.toPoint,
          movement: rel.eclipticAspect.movement,
          dateExact: stringifyDate(rel.eclipticAspect.localDateOfExact),
          movementPC: rel.precessionCorrectedAspect.movement,
          dateExactPC: stringifyDate(rel.precessionCorrectedAspect.localDateOfExact),
        })),
    );
  }, [collection]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={aspects}
      />
    </div>
  );
}
