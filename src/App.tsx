import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import { BaseProvider, ChartNav } from "@components";
import { useBaseContext } from "@hooks";
import { Background } from "@styles";

const queryClient = new QueryClient();

function TestDisplay() {
  const { liveData } = useBaseContext();

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
        {JSON.stringify(liveData, null, 2)}
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
