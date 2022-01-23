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
 * A hook for interacting with the website history.
 */
export interface RouteHook {
  /**
   * A history object for navigation.
   * For simple route pushing, use the "goTo"
   * method from the global context instead.
   */
  history: BrowserHistory<HistoryState>;
  /**
   * The current query parameters.
   */
  query: URLSearchParams;

  /**
   * A function for navigating to the given route.
   *
   * @param route - A route string to navigate to.
   * @param pathVars - Any path variables to fill in on the given route.
   * @param queryParams - Any query params to attach to the route.
   */
  goTo(
    route: string,
    pathVars?: Record<string, string>,
    queryParams?: Record<string, string>
  ): void;

  /**
   * Updates the given query parameter values.
   *
   * @param queryParams - Any query params to attach to the update.
   */
  updateQuery(queryParams: Record<string, string>): void;
}
