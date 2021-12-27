import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";

import { BaseProvider, ChartNav } from "@components";
import { useBaseContext } from "@hooks";

function TestDisplay() {
  const { liveData } = useBaseContext();

  return (
    <Typography
      color="white"
      style={{
        marginTop: "5em",
        marginLeft: "3em",
        whiteSpace: "pre",
      }}
    >
      {JSON.stringify(liveData, null, 2)}
    </Typography>
  );
}

export default function App() {
  return (
    <>
      <CssBaseline />
      <BaseProvider>
        <ChartNav />
        <TestDisplay />
      </BaseProvider>
    </>
  );
}
