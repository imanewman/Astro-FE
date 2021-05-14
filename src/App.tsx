import React from "react";
import { TextField, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Box, BaseProvider } from "@components";
import { usePrimitive } from "@hooks";

const obj = { abc: "123", def: 456 };

function Title() {
  const { value } = usePrimitive(obj, "abc", true);

  return (
    <Typography variant="h1" align="center" color="primary">
      Hello
      {" "}
      {value}
      !
    </Typography>
  );
}

function App() {
  const { value, setValue } = usePrimitive(obj, "abc");

  return (
    <>
      <CssBaseline />
      <BaseProvider>
        <Box fullWidth py={10} alignX="center">
          <Title />
          <TextField
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Box>
      </BaseProvider>
    </>
  );
}

export default App;
