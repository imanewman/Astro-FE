import { useState } from "react";

/**
 * Creates a hook for managing a queue of snackbar messages.
 */
export default function useSnackbar(): SnackbarHook {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);

  const popSnackPack = () => {
    setSnackPack((prev) => prev.slice(1));
  };

  const createSnackbar = (message: string, severity: Severity = "info") => {
    setSnackPack((prev) => [
      ...prev,
      { message, severity, key: new Date().getTime() },
    ]);
  };

  return { createSnackbar, snackPack, popSnackPack };
}
