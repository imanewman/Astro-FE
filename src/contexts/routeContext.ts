import { createContext } from "react";
import { BrowserHistory, createBrowserHistory } from "history";
import { HistoryState, RouteHook } from "@typedefs";

const history = createBrowserHistory() as BrowserHistory<HistoryState>;

history.listen(({ location }) => {
  if (!location.pathname.includes(location.state?.from.pathname)) {
    window.scrollTo({ top: 0 });
  }
});

export default createContext<RouteHook>({
  history,
  goTo: () => {},
});
