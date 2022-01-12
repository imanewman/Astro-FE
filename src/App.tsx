import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";

import { Background } from "@styles";
import { AspectTable, BaseProvider, ChartNav } from "@components";

const queryClient = new QueryClient();

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
            <AspectTable />
          </ChartNav>
        </Background>
      </BaseProvider>
    </QueryClientProvider>
  );
}
