import { BrowserHistory } from "history";

/**
 * Represents the current history state.
 */
export interface HistoryState {
  /**
   * The route visited last.
   */
  from: { pathname: string, search: string };
}

/**
 * A hook for interacting with the the website history.
 */
export interface RouteHook {
  /**
   * A history object for navigation.
   * For simple route pushing, use the "goTo"
   * method from the global context instead.
   */
  history: BrowserHistory<HistoryState>;

  /**
   * A function for navigating to the given route.
   * @param route - A route string to navigate to.
   * @param pathVars - Any path variables to fill in on the given route.
   * @param queryParams - Any query params to attach to the route.
   */
  goTo(
    route: string,
    pathVars?: { [name: string]: string },
    queryParams?: { [name: string]: string }
  ): void;
}
