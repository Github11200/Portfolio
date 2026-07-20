export default class Vector2D {
  x = 0
  y = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(v: Vector2D) {
    return new Vector2D(this.x + v.x, this.y + v.y)
  }

  subtract(v: Vector2D) {
    return new Vector2D(this.x - v.x, this.y - v.y)
  }

  multiply(v: Vector2D) {
    return new Vector2D(this.x * v.x, this.y * v.y)
  }

  scale(s: number) {
    return new Vector2D(this.x * s, this.y * s)
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
}
