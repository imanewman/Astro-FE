import React from "react";
import ReactJson from "react-json-view";

import { useBaseContext } from "@hooks";

/**
 * Renders json data.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Json Display
 */
export default function JsonDisplay(props: { json: object }) {
  const { json } = props;
  const { themeMode } = useBaseContext();

  return (
    <ReactJson
      src={json}
      theme={themeMode === "dark" ? "monokai" : undefined}
    />
  );
}
