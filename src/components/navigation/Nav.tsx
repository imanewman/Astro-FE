import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar, Divider, Drawer, IconButton, Toolbar, Tooltip, useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { NavProps } from "@typedefs";
import { useNavStyles } from "@styles";

/**
 * Renders the navigation top and side bars.
 *
 * @param props - Component Props.
 * @constructor
 * @visibleName Navigation
 */
export default function Nav(props: NavProps) {
  const { toolbar, sidebar } = props;
  const classes = useNavStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        color="inherit"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Tooltip title="Open settings" enterDelay={300}>
            <IconButton
              aria-label="open settings"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          {toolbar}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Tooltip title="Close settings" enterDelay={300}>
            <IconButton aria-label="close settings" onClick={handleDrawerClose} size="large">
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        {sidebar}
      </Drawer>
    </div>
  );
}

Nav.defaultProps = {
  toolbar: undefined,
  sidebar: undefined,
};
