import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { BaseProvider, ChartNav } from "@components";

export default function App() {
  return (
    <>
      <CssBaseline />
      <BaseProvider>
        <ChartNav />
      </BaseProvider>
    </>
  );
}
