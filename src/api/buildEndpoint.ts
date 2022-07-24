/**
 * Enumerates all API endpoints.
 */
import axios, { AxiosRequestConfig } from "axios";

export enum APIPath {
  // Collections
  signs = "/signs",
  points = "/points",
  aspects = "/aspects",
  // Calculations
  chart = "/chart",
  timezone = "/timezone",
}

/**
 * Builds an endpoint for interacting with the backend.
 */
export default class Endpoint<SendType, ReceiveType> {
  constructor(
    private path: string,
    private isInternalPath = true,
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
    let path = this.isInternalPath
      ? `${process.env.REACT_APP_API_URL}${this.path}`
      : this.path;
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
  private async request(options: AxiosRequestConfig): Promise<ReceiveType> {
    const path = this.getPath;
    const res = await axios.request({ url: path, ...options });

    if (res.status !== 200) {
      throw Error(`Unable to ${options.method} ${path}: ${res.status}`);
    }

    return res.data;
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
   * Puts data to the API.
   *
   * @param data - The data to upload.
   * @return The response data.
   * @throws Error if the response type is not ok.
   */
  async put(data: SendType): Promise<ReceiveType> {
    return this.request({
      method: "PUT",
      data,
    });
  }

  /**
   * Posts data to the API.
   *
   * @param data - The data to upload.
   * @return The response data.
   * @throws Error if the response type is not ok.
   */
  async post(data: SendType): Promise<ReceiveType> {
    return this.request({
      method: "POST",
      data,
    });
  }
}

/**
 * Builds a preset endpoint path.
 *
 * @param path - The path to create an endpoint to.
 * @param isInternalPath - Whether this path is to the internal API
 * @return The built endpoint.
 */
export function buildEndpoint<S, R>(path: string, isInternalPath = true): Endpoint<S, R> {
  return new Endpoint(path, isInternalPath);
}
