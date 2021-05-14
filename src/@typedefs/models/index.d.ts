declare type Primitive = null | string | number | boolean;

/**
 * Defines the generic structure of JSON data from the backend
 */
declare type JsonObject = {
  [name: string]: Primitive | Primitive[] | JsonObject | JsonObject[]
};
