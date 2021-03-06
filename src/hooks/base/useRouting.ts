import { useContext } from "react";

import { RouteHook } from "@typedefs";
import { fillRoute } from "@utils";
import { RouteContext } from "@contexts";

/**
 * Creates a hook for interacting with the web history.
 */
export default function useRouting(): RouteHook {
  const { history } = useContext(RouteContext);

  return {
    history,
    query: new URLSearchParams(history.location.search),
    goTo(route, pathVars, queryParams) {
      const fullRoute = fillRoute(route, pathVars, queryParams);

      if (fullRoute.includes("mailto:") || fullRoute.includes("://")) {
        // open direct links.
        window.open(fullRoute);
      } else if (fullRoute.includes(".com") || fullRoute.includes("www.")) {
        // convert direct links so they aren't relative.
        window.open(`http://${fullRoute}`);
      } else {
        // open relative links.
        history.push(route, { from: history.location });
      }
    },
    updateQuery(queryParams: Record<string, string>) {
      history.replace({
        pathname: history.location.pathname,
        search: `?${new URLSearchParams(queryParams).toString()}`,
      });
    },
  };
}
