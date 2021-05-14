import React from "react";
import { Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Box } from "@components";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Box fullWidth my={10}>
        <Typography variant="h1" align="center">
          Hello!
        </Typography>
      </Box>
    </div>
  );
}

export default App;
