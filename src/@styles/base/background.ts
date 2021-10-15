import { Theme } from "@mui/material/styles";

import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";

export default makeStyles((theme: Theme) => createStyles({
  root: {
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
}),
{ index: 1 });
