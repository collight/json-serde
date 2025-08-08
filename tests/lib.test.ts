import { describe, expect, it } from 'vitest'

import { JSONSerde } from '../src'

type Vector2Like = {
  x: number
  y: number
}

@JSONSerde<Vector2Like>()
class Vector2 {
  static fromJSON({ x, y }: Vector2Like): Vector2 {
    return new Vector2(x, y)
  }

  constructor(
    public x: number,
    public y: number,
  ) {}

  toJSON(): Vector2Like {
    const { x, y } = this
    return { x, y }
  }
}

type Size2Like = {
  width: number
  height: number
}

@JSONSerde<Size2Like>()
class Size2 {
  static fromJSON({ width, height }: Size2Like): Size2 {
    return new Size2(width, height)
  }

  constructor(
    public width: number,
    public height: number,
  ) {}

  toJSON(): Size2Like {
    const { width, height } = this
    return { width, height }
  }
}

type Rect2Like = {
  origin: Vector2Like
  size: Size2Like
}

@JSONSerde<Rect2Like>()
class Rect2 {
  static fromJSON(json: Rect2Like): Rect2 {
    const { origin, size } = json
    return new Rect2(Vector2.fromJSON(origin), Size2.fromJSON(size))
  }

  constructor(
    public origin: Vector2,
    public size: Size2,
  ) {}

  toJSON(): Rect2Like {
    const origin = this.origin.toJSON()
    const size = this.size.toJSON()
    return { origin, size }
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

  it('should serialize rect2', () => {
    const rect2 = new Rect2(new Vector2(1, 2), new Size2(3, 4))
    const json = rect2.toJSON()
    expect(json).toEqual({ origin: { x: 1, y: 2 }, size: { width: 3, height: 4 } })
  })

  it('should deserialize rect2', () => {
    const rect2 = Rect2.fromJSON({ origin: { x: 1, y: 2 }, size: { width: 3, height: 4 } })
    expect(rect2).toBeInstanceOf(Rect2)
    expect(rect2.origin).toBeInstanceOf(Vector2)
    expect(rect2.size).toBeInstanceOf(Size2)
    expect(rect2.origin.x).toBe(1)
    expect(rect2.origin.y).toBe(2)
    expect(rect2.size.width).toBe(3)
    expect(rect2.size.height).toBe(4)
  })
})
