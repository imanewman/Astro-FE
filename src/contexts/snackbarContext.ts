import { createContext } from "react";

export default createContext<SnackbarHook>({
  createSnackbar: () => {},
  snackPack: [],
  popSnackPack: () => {},
});
