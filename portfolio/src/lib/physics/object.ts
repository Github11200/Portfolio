import Vector2D from "./vector";

export default class Object {
  position: Vector2D = new Vector2D(0, 0)
  velocity: Vector2D = new Vector2D(0, 0)
  angularVelocity: number = 0
  rotation: number = 0
  mass: number = 0

  width: number = 0
  height: number = 0
  color: string = ""

  id: string = ""

  constructor(position: Vector2D,
    velocity: Vector2D,
    angularVelocity: number,
    rotation: number,
    mass: number,
    width: number,
    height: number,
    color: string,
    id: string) {
    this.position = position
    this.velocity = velocity
    this.angularVelocity = angularVelocity
    this.rotation = rotation
    this.mass = mass

    this.width = width
    this.height = height
    this.color = color

    this.id = id
  }

  step(dt: number) {
    this.rotation += this.angularVelocity * dt
    this.position = this.position.add(this.velocity.scale(dt))
  }
}