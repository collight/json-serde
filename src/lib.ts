// MARK: JSON
export type JSONPrimitive = string | number | boolean | null

export type JSONValue = JSONPrimitive | JSONArray | JSONObject

export type JSONArray = JSONValue[]

export type JSONObject = { [property: string]: JSONValue }

// MARK: Readonly JSON
export type ReadonlyJSONValue = JSONPrimitive | ReadonlyJSONArray | ReadonlyJSONObject

export type ReadonlyJSONArray = readonly ReadonlyJSONValue[]

export type ReadonlyJSONObject = { readonly [property: string]: ReadonlyJSONValue }

// MARK: Predicates
export function isJSONPrimitive(v: unknown): v is JSONPrimitive {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null
}

export function isJSONArray(v: JSONValue): v is JSONArray
export function isJSONArray(v: ReadonlyJSONValue): v is ReadonlyJSONArray
export function isJSONArray(v: ReadonlyJSONValue): boolean {
  return Array.isArray(v)
}

export function isJSONObject(v: JSONValue): v is JSONObject
export function isJSONObject(v: ReadonlyJSONValue): v is ReadonlyJSONObject
export function isJSONObject(v: ReadonlyJSONValue): boolean {
  return !isJSONArray(v) && typeof v === 'object'
}

// MARK: JSON Serde
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any, Args extends unknown[] = any[]> = new (...args: Args) => T

/**
 * Interface for objects that can be serialized to JSON.
 *
 * @template T - The shape of the JSON object returned by `toJSON`.
 */
export interface JSONSerializable<T extends JSONObject = JSONObject> {
  /**
   * Converts the instance into a JSON object.
   *
   * @returns A JSON object representation of the instance.
   */
  toJSON(): T
}

/**
 * Interface for classes that can be deserialized from JSON.
 *
 * @template T - The expected shape of the JSON object used for deserialization.
 */
export interface JSONDeserializable<T extends JSONObject = JSONObject> extends Constructor {
  /**
   * Creates an instance of the class from a JSON object.
   *
   * @param json - A JSON object conforming to the shape `T`.
   * @returns An instance of the class.
   */
  fromJSON(json: T): InstanceType<this>
}

/**
 * Type alias representing a class that supports both JSON serialization and deserialization.
 *
 * @template T - The JSON shape for serialization/deserialization.
 */
export type JSONSerde<T extends JSONObject = JSONObject> = Constructor<JSONSerializable<T>> & JSONDeserializable<T>

/**
 * Decorator factory marking a class as JSON serializable and deserializable.
 *
 * This is a no-op decorator that can be used for documentation or tooling purposes.
 *
 * @template T - The JSON shape for serialization/deserialization.
 * @returns A decorator function that accepts a JSONSerde class constructor.
 */
export function JSONSerde<T extends JSONObject = JSONObject>(): (_: JSONSerde<T>) => void {
  return (): void => void 0
}
