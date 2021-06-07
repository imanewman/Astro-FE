import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar, Divider, Drawer, IconButton, Toolbar, Tooltip, useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
            <IconButton
              aria-label="close settings"
              onClick={handleDrawerClose}
            >
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
