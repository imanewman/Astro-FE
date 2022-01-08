import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Paper, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactJson from "react-json-view";

import { BaseProvider, ChartNav } from "@components";
import { createNewChart, useBaseContext } from "@hooks";
import { Background } from "@styles";

const queryClient = new QueryClient();

function TestDisplay() {
  const {
    themeMode, liveData, liveChartError, addBiwheel,
  } = useBaseContext();

  const handleClick = () => {
    addBiwheel(createNewChart({
      localDate: new Date(Date.now()).toISOString(),
      utcDate: new Date(Date.now()).toISOString(),
      latitude: "40.78",
      longitude: "-73.97",
    }));
  };

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
      <Button fullWidth onClick={handleClick}>
        Add Transits
      </Button>
    </Paper>
  );
}

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
