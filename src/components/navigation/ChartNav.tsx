import React, { PropsWithChildren } from "react";

import { IconButton, Tooltip } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import {
  Box, ChartPicker, ChartSettings,
} from "@components";
import { useBaseContext } from "@hooks";
import Nav from "./Nav";

/**
 * Renders the navigation for the chart builder.
 *
 * @constructor
 * @visibleName Chart Navigation
 */
export default function ChartNav(props: PropsWithChildren<{}>) {
  const { themeMode, setThemeMode } = useBaseContext();
  const isLightMode = themeMode === "light";

  const handleToggleDarkMode = () => {
    setThemeMode(isLightMode ? "dark" : "light");
  };

  return (
    <Nav
      toolbar={(
        <Box row fullWidth spaceBetween gapX={1}>
          <ChartPicker />

          <Tooltip title="Toggle dark mode" enterDelay={300}>
            <IconButton aria-label="toggle dark mode" onClick={handleToggleDarkMode} size="large">
              {isLightMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
      sidebar={(
        <ChartSettings />
      )}
      {...props}
    />
  );
}
