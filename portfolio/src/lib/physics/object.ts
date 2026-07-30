import type { AABB } from "$lib/types";
import Konva from "konva";
import Vector2D from "./vector";

export class Object {
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

  konvaObject: Konva.Rect
  beingDragged: boolean = false

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
    this.vertices = this.generateVertices()

    this.konvaObject = new Konva.Rect({
      x: this.position.x,
      y: this.position.y,
      width: this.width,
      height: this.height,
      fill: this.color,
      stroke: this.color,
      draggable: true,
    });

    this.konvaObject.on("dragstart", (e) => { this.beingDragged = true })
    this.konvaObject.on("dragend", (e) => { this.beingDragged = false })
    this.konvaObject.on("dragmove", (e) => {
      this.position.x = e.target.x()
      this.position.y = e.target.y()
    })
  }

  getKonvaObject() {
    return this.konvaObject
  }

  updateKonvaObject() {
    this.konvaObject.x(this.position.x)
    this.konvaObject.y(this.position.y)
    this.konvaObject.width(this.width)
    this.konvaObject.height(this.height)
    this.konvaObject.fill(this.color)
    this.konvaObject.stroke(this.color)
  }

  applyForce(force: Vector2D) {
    this.force = this.force.add(force);
  }

  generateVertices(): Vector2D[] {
    return [
      new Vector2D(-this.width / 2, this.height / 2),
      new Vector2D(this.width / 2, this.height / 2),
      new Vector2D(this.width / 2, -this.height / 2),
      new Vector2D(-this.width / 2, -this.height / 2),
    ]
  }

  private screenCoordinateSystemToCartesian(v: Vector2D) {
    return new Vector2D(v.x + this.width / 2, v.y + this.height / 2)
  }

  // Convert from the local cartesian system for this object to global world coordinates
  private localToGlobal(v: Vector2D): Vector2D {
    return this.position.add(this.screenCoordinateSystemToCartesian(v.rotate(this.rotation)))
  }

  getTransformedVertices(): Vector2D[] {
    let res = []
    for (const v of this.vertices)
      res.push(this.localToGlobal(v))
    return res
  }

  step(dt: number) {
    if (this.beingDragged)
      return
    const acceleration = this.force.scale(1 / this.mass)

    this.velocity = this.velocity.add(acceleration.scale(dt))
    this.position = this.position.add(this.velocity.scale(dt))
    this.rotation += this.angularVelocity * dt
    this.force = new Vector2D(0, 0)
  }

  getAABB(): AABB {
    let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
    for (const vertex of this.getTransformedVertices()) {
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
