import { Theme } from "@mui/material/styles";

declare module "@mui/styles" {
  interface DefaultTheme extends Theme {}
}

export * from "./components";
export * from "./hooks";
