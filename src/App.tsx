import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactJson from "react-json-view";

import CssBaseline from "@mui/material/CssBaseline";
import { Paper, Typography } from "@mui/material";

import { Background } from "@styles";
import { useBaseContext } from "@hooks";
import { BaseProvider, ChartNav } from "@components";

const queryClient = new QueryClient();

function TestDisplay() {
  const {
    themeMode, liveData, liveChartError,
  } = useBaseContext();

  return (
    <Paper style={{ marginTop: "6em" }}>
      {liveChartError ? (
        <Typography color="error">Error Loading CHart</Typography>
      ) : (
        <ReactJson
          src={liveData?.charts.map((chart: any) => chart.summary)}
          theme={themeMode === "dark" ? "monokai" : undefined}
        />
      )}
    </Paper>
  );
}

/**
 * Displays the main app.
 * @constructor
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BaseProvider>
        <Background>
          <ChartNav>
            <TestDisplay />
          </ChartNav>
        </Background>
      </BaseProvider>
    </QueryClientProvider>
  );
}
