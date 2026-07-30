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

  dot(v: Vector2D) {
    return this.x * v.x + this.y * v.y
  }

  crossProduct(scaler: number) {
    return new Vector2D(-this.y * scaler, this.x * scaler)
  }

  // Apply a rotation matrix to rotate a vector by some number of radians
  rotate(angle: number) {
    return new Vector2D(this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }

  normalize() {
    return new Vector2D(this.x / this.magnitude(), this.y / this.magnitude())
  }
}
