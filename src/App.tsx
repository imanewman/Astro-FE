import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";

import { Background } from "@styles";
import {
  AspectTable, BaseProvider, Box, ChartNav,
} from "@components";
import { useBaseContext } from "@hooks";

const queryClient = new QueryClient();

/**
 * Displays the app tools.
 * @constructor
 */
function AppTools() {
  const { enabledAspectTable } = useBaseContext();

  return (
    <Box>
      {enabledAspectTable && <AspectTable />}
    </Box>
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
            <AppTools />
          </ChartNav>
        </Background>
      </BaseProvider>
    </QueryClientProvider>
  );
}
