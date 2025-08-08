import { describe, expect, it } from 'vitest'

import { JSONSerde } from '../src'

type Vector2Like = {
  x: number
  y: number
}

@JSONSerde<Vector2Like>()
class Vector2 {
  static fromJSON(json: Vector2Like): Vector2 {
    return new Vector2(json.x, json.y)
  }

  constructor(
    public x: number,
    public y: number,
  ) {}

  toJSON(): Vector2Like {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

describe('json-serde', () => {
  it('should serialize', () => {
    const vector2 = new Vector2(1, 2)
    const json = vector2.toJSON()
    expect(json).toEqual({ x: 1, y: 2 })
  })

  it('should deserialize', () => {
    const vector2 = Vector2.fromJSON({ x: 1, y: 2 })
    expect(vector2).toBeInstanceOf(Vector2)
    expect(vector2.x).toBe(1)
    expect(vector2.y).toBe(2)
  })
})
