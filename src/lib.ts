// MARK: JSON
export type JSONPrimitive = string | number | boolean | null

export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export type JSONArray = JSONValue[]

export interface JSONObject {
  [property: string]: JSONValue
}

// MARK: JSON Serde
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = any, Args extends unknown[] = any[]> = new (...args: Args) => T

export interface JSONSerializable<T extends JSONObject = JSONObject> {
  toJSON(): T
}

// Static interface
export interface JSONDeserializable<T extends JSONObject = JSONObject> extends Constructor {
  fromJSON(json: T): InstanceType<this>
}

type JSONSerde<T extends JSONObject = JSONObject> = Constructor<JSONSerializable<T>> & JSONDeserializable<T>

export function JSONSerde<T extends JSONObject = JSONObject>(): (_: JSONSerde<T>) => void {
  return (): void => void 0
}
