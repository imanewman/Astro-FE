import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import { BaseProvider, ChartNav } from "@components";
import { useBaseContext } from "@hooks";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BaseProvider>
        <ChartNav />
        <TestDisplay />
      </BaseProvider>
    </QueryClientProvider>
  );
}
