import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stringifyDate } from "@utils";

const columns: GridColDef[] = [
  {
    field: "toPoint",
    headerName: "Transiting",
  },
  {
    field: "aspect",
    headerName: "Aspect",
  },
  {
    field: "fromPoint",
    headerName: "Natal",
  },
  {
    field: "movement",
    headerName: "Movement",
    width: 100,
  },
  {
    field: "dateExact",
    headerName: "Date Exact",
    width: 160,
  },
  {
    field: "movementPC",
    headerName: "PC Movement",
    width: 100,
  },
  {
    field: "dateExactPC",
    headerName: "PC Date Exact",
    width: 160,
  },
];

/**
 * Renders a table of aspects.
 *
 * @constructor
 * @visibleName Aspect Table Grid
 */
export default function AspectTableGrid(props: AspectTableProps) {
  const { collection } = props;
  const [aspects, setAspects] = useState<JsonObject[]>([]);

  useEffect(() => {
    // TODO: remove filer. Extract out conversion to grid data format.
    setAspects(
      collection.relationships
        // .filter((rel) => ![
        //   "Ascendant", "Descendant", "Midheaven", "Inner Heaven", "Vertex",
        // ].includes(rel.toPoint)
        //   && !rel.toPoint.includes("Lot ")
        //   && (rel.eclipticAspect.localDateOfExact
        //     || rel.precessionCorrectedAspect.localDateOfExact)
        //   && (rel.eclipticAspect.movement?.includes("Applying")
        //     || rel.precessionCorrectedAspect.movement?.includes("Applying")))
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
