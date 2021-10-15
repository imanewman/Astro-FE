import React, { useState, useEffect, useContext } from "react";
import { IconButton, Snackbar, Alert } from "@mui/material";

import { Close } from "@mui/icons-material";

import { SnackbarContext } from "@contexts";

/**
 * Displays and manages the queue of snackbar messages.
 *
 * @constructor
 * @visibleName Snackbar Manager
 */
export default function SnackbarManager() {
  const { snackPack, popSnackPack } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      popSnackPack();
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open, popSnackPack]);

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={messageInfo?.message}
      TransitionProps={{
        onExited: () => setMessageInfo(undefined),
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={messageInfo?.severity}
        action={(
          <IconButton
            onClick={() => setOpen(false)}
            aria-label="close snackbar"
            size="small"
            color="inherit"
          >
            <Close />
          </IconButton>
        )}
      >
        {messageInfo?.message}
      </Alert>
    </Snackbar>
  );
}
