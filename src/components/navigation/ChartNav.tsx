import React from "react";

import { IconButton, Tooltip } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import { Box } from "@components";
import { useBaseContext } from "@hooks";
import Nav from "./Nav";

/**
 * Renders the navigation for the chart builder.
 *
 * @constructor
 * @visibleName Chart Navigation
 */
export default function ChartNav() {
  const { themeMode, setThemeMode } = useBaseContext();
  const isLightMode = themeMode === "light";

  const handleToggleDarkMode = () => {
    setThemeMode(isLightMode ? "dark" : "light");
  };

  return (
    <Nav
      toolbar={(
        <Box fullWidth alignX="flex-end">
          <Tooltip title="Toggle dark mode" enterDelay={300}>
            <IconButton
              color="inherit"
              aria-label="toggle dark mode"
              onClick={handleToggleDarkMode}
            >
              {isLightMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
}