import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router, Route, Switch } from "react-router-dom";

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
 * Controls app routing.
 * @constructor
 */
function AppRouter() {
  const { history } = useBaseContext();

  return (
    <ChartNav>
      <Router history={history}>
        <Switch>
          <Route
            path="*"
            component={() => (
              <AppTools />
            )}
          />
        </Switch>
      </Router>
    </ChartNav>
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
          <AppRouter />
        </Background>
      </BaseProvider>
    </QueryClientProvider>
  );
}
