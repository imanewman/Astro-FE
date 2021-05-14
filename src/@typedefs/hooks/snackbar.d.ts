/**
 * Represents the severity of a message.
 */
declare type Severity = "info" | "success" | "error";

/**
 * The stored details of a snackbar message.
 */
declare interface SnackbarMessage {
  /**
   * The message contents of the snackbar.
   */
  message: string;

  /**
   * A unique key for this snackbar.
   */
  key: number;

  /**
   * The severity of this snackbar message.
   */
  severity: Severity;
}

/**
 * A hook for managing a stack of snackbar messages to be shown.
 */
declare interface SnackbarHook {
  /**
   * The current queue of snackbar messages to render.
   */
  snackPack: SnackbarMessage[];

  /**
   * Pops the first snackPack message off the stack of messages.
   */
  popSnackPack(): void;

  /**
   * Creates and enqueues a new snackbar message.
   * @param message - The message contents to present in a snackbar.
   * @param severity - The severity of the message. If not set, the
   * severity will default to the neutral "info".
   */
  createSnackbar(message: string, severity?: Severity): void;
}
