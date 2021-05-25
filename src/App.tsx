import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

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
