import { useContext } from "react";

import { RouteHook } from "@typedefs";
import { RouteContext } from "@contexts";
import { fillRoute } from "@utils";

/**
 * Creates a hook for interacting with the web history.
 */
export default function useRouting(): RouteHook {
  const { history } = useContext(RouteContext);

  return {
    history,
    goTo(route, pathVars, queryParams) {
      const fullRoute = fillRoute(route, pathVars, queryParams);

      if (fullRoute.includes("mailto:") || fullRoute.includes("://")) {
        // open direct links
        window.open(fullRoute);
      } else if (fullRoute.includes(".com") || fullRoute.includes("www.")) {
        // convert direct links so they arent relative
        window.open(`http://${fullRoute}`);
      } else {
        // open relative links
        history.push(route, { from: history.location });
      }
    },
  };
}