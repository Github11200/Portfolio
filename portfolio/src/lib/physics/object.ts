import type { AABB } from "$lib/types";
import Vector2D from "./vector";

export abstract class Object {
  position: Vector2D = new Vector2D(0, 0)
  velocity: Vector2D = new Vector2D(0, 0)
  angularVelocity: number = 0
  rotation: number = 0
  mass: number = 0

  force: Vector2D = new Vector2D(0, 0)

  width: number = 0
  height: number = 0
  color: string = ""

  id: string = ""

  vertices: Vector2D[] = []

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

  abstract generateVertices(): void;

  private localToGlobal(vertex: Vector2D): Vector2D {
    return new Vector2D(this.position.x vertex.x, 0)
  }

  step(dt: number) {
    const acceleration = this.force.scale(1 / this.mass)

    this.velocity = this.velocity.add(acceleration.scale(dt))

    this.position = this.position.add(this.velocity.scale(dt))

    this.rotation += this.angularVelocity * dt

    this.force = new Vector2D(0, 0)
  }

  getAABB(): AABB {
    let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
    for (const vertex of this.vertices) {
      minX = Math.min(minX, vertex.x);
      minY = Math.min(minY, vertex.y);
      maxX = Math.max(maxX, vertex.x);
      maxY = Math.max(maxY, vertex.y);
    }

    return {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY
    }
  }
}

export class Box extends Object {
  generateVertices(): void {

  }
}

export class Hexagon extends Object {
  generateVertices(): void {

  }
}