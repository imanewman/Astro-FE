import { createContext } from "react";
import { defaultTheme } from "@styles";
import { ThemeHook } from "@typedefs";

const theme = defaultTheme();

export default createContext<ThemeHook>({
  theme,
  themeMode: theme.palette?.type || "light",
  setThemeMode: () => {},
});
