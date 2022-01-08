import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactJson from "react-json-view";

import { BaseProvider, ChartNav } from "@components";
import { useBaseContext } from "@hooks";
import { Background } from "@styles";

const queryClient = new QueryClient();

function TestDisplay() {
  const { liveData, liveChartError } = useBaseContext();

  return (
    <Paper>
      <Typography
        color="inherit"
        style={{
          marginTop: "5em",
          marginLeft: "3em",
          whiteSpace: "pre",
        }}
      >
        {liveChartError ? (
          <Typography color="error">Error Loading CHart</Typography>
        ) : (
          <ReactJson
            src={{
              summary: liveData?.charts[0]?.summary,
              ascendant: liveData?.charts[0]?.points.Ascendant,
              sun: liveData?.charts[0]?.points.Sun,
              moon: liveData?.charts[0]?.points.Moon,
            }}
            theme="monokai"
          />
        )}
      </Typography>
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
