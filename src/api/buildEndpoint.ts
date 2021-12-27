export enum APIPath {
  // Collections
  signs = "/signs",
  points = "/points",
  aspects = "/aspects",
  // Calculations
  chart = "/chart",
}

/**
 * Builds an endpoint for interacting with the backend.
 */
export default class Endpoint<SendType, ReceiveType> {
  constructor(
    private path: string,
    private pathVariables?: Record<string, string>,
    private queryParameters?: Record<string, string>,
  ) {}

  /**
   * Adds new path variables.
   *
   * @param pathVariables - The path variables to set.
   */
  fillPath(pathVariables?: Record<string, string>): this {
    this.pathVariables = pathVariables;

    return this;
  }

  /**
   * Adds new query parameters.
   *
   * @param queryParameters - The query parameters to set.
   */
  fillQuery(queryParameters?: Record<string, string>): this {
    this.queryParameters = queryParameters;

    return this;
  }

  /**
   * The endpoint path with all variables filled in.
   *
   * @return The endpoint path.
   */
  get getPath(): string {
    let path = `${process.env.API_PATH}/${this.path}`;
    const query = this.queryParameters
      && new URLSearchParams(this.queryParameters).toString();

    Object.entries(this.pathVariables || {})
      .forEach(([key, val]) => {
        path = path.replace(`:${key}`, val);
      });

    return query ? `${path}?${query}` : path;
  }

  /**
   * Interacts with this API endpoint.
   *
   * @param options - The fetch options to use in the request.
   * @return The fetched data.
   * @throws Error if the response type is not ok.
   */
  private async request(options: RequestInit): Promise<ReceiveType> {
    const path = this.getPath;
    const res = await fetch(
      path,
      options,
    );

    if (!res.ok) {
      throw Error(`Unable to ${options.method} ${path}: ${res.status}`);
    }

    return res.json();
  }

  /**
   * Downloads data from the API.
   *
   * @return The fetched data.
   * @throws Error if the response type is not ok.
   */
  async get(): Promise<ReceiveType> {
    return this.request({ method: "GET" });
  }

  /**
   * Uploads data to the API.
   *
   * @param body - The data to upload.
   * @return The response data.
   * @throws Error if the response type is not ok.
   */
  async put(body: SendType): Promise<ReceiveType> {
    return this.request({
      method: "PUT",
      body: JSON.stringify(body),
    });
  }
}

/**
 * Builds a preset endpoint path.
 *
 * @param path - The path to create an endpoint to.
 */
export function buildEndpoint<S, R>(path: APIPath): Endpoint<S, R> {
  return new Endpoint(path);
}
