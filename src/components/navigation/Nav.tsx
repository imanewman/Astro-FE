import React, { useState } from "react";

import {
  Divider, Drawer, IconButton, Toolbar, Tooltip, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { NavProps } from "@typedefs";
import {
  Main, NavAppBar, DrawerHeader, drawerWidth,
} from "@styles";

/**
 * Renders the navigation top and sidebars.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Navigation
 */
export default function Nav(props: NavProps) {
  const { toolbar, sidebar, children } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <NavAppBar
        color="inherit"
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Tooltip title="Open settings" enterDelay={300}>
            <IconButton
              aria-label="open settings"
              onClick={handleDrawerOpen}
              edge="start"
              size="large"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          {toolbar}
        </Toolbar>
      </NavAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Tooltip title="Close settings" enterDelay={300}>
            <IconButton aria-label="close settings" onClick={handleDrawerClose} size="large">
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        <Divider />
        {sidebar}
      </Drawer>
      <Main open={open}>
        {children}
      </Main>
    </div>
  );
}

Nav.defaultProps = {
  toolbar: undefined,
  sidebar: undefined,
};
