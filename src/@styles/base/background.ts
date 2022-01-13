import { styled } from "@mui/material/styles";

export default styled("div")(({ theme }) => ({
  minHeight: "100vh",
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
}));
