declare type Primitive = null | string | number | boolean | undefined;

/**
 * Defines a JSON object.
 */
declare type JsonObject = {
  [name: string]: Primitive | Primitive[] | JsonObject | JsonObject[]
};

/**
 * Defines any JSOn data.
 */
declare type Json = Primitive | Primitive[] | JsonObject | JsonObject[];
