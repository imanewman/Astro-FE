import { useState } from "react";

import { ThemeHook, ThemeMode } from "@typedefs";
import { defaultTheme } from "@styles";

/**
 * Creates a hook for managing the current theme mode and related variables.
 *
 * @param mode - The theme mode to start on.
 */
export default function useTheme(mode?: ThemeMode): ThemeHook {
  const [theme, setTheme] = useState(defaultTheme(mode));

  return {
    theme,
    themeMode: theme.palette?.mode || "light",
    setThemeMode(type: ThemeMode) {
      setTheme(defaultTheme(type));
    },
  };
}
