import type { AABB } from "$lib/types";
import Konva from "konva";
import Vector2D from "./vector";

type Shape = "Square" | "Hexagon"

export class Object {
  position: Vector2D = new Vector2D(0, 0)
  velocity: Vector2D = new Vector2D(0, 0)
  angularVelocity: number = 0
  rotation: number = 0
  mass: number = 0
  inverseMass: number = 0
  restitution: number = 0
  isStatic: boolean = false
  inertia: number = 0
  inverseInertia: number = 0

  force: Vector2D = new Vector2D(0, 0)

  width: number = 0
  height: number = 0
  color: string = ""
  shape: Shape

  id: string = ""

  vertices: Vector2D[] = []

  konvaObject: Konva.RegularPolygon | Konva.Rect
  beingDragged: boolean = false

  // TODO: Change the vertices based on the shape type
  private createKonvaObject() {
    if (this.shape === "Square") {
      return new Konva.Rect({
        x: this.position.x,
        y: this.position.y,
        width: this.width,
        height: this.height,
        fill: this.color,
        stroke: this.color,
        draggable: true,
        offsetX: this.width / 2,
        offsetY: this.height / 2
      })
    } else {
      return new Konva.RegularPolygon({
        x: this.position.x,
        y: this.position.y,
        fill: this.color,
        stroke: this.color,
        draggable: true,
        sides: 6,
        radius: this.width,
      });
    }
  }

  constructor(position: Vector2D,
    velocity: Vector2D,
    angularVelocity: number,
    rotation: number,
    mass: number,
    restitution: number,
    isStatic: boolean,
    width: number,
    height: number,
    shape: Shape,
    color: string,
    id: string) {
    this.position = position
    this.velocity = velocity
    this.angularVelocity = angularVelocity
    this.rotation = rotation
    this.restitution = restitution
    this.isStatic = isStatic

    this.mass = mass
    this.inverseMass = this.isStatic ? 0 : 1 / this.mass

    this.width = width
    this.height = height
    this.color = color
    this.shape = shape

    this.id = id
    this.vertices = this.generateVertices()

    this.konvaObject = this.createKonvaObject()

    this.konvaObject.on("dragstart", () => { this.beingDragged = true })
    this.konvaObject.on("dragend", () => { this.beingDragged = false })
    this.konvaObject.on("dragmove", (e) => {
      this.position.x = e.target.x()
      this.position.y = e.target.y()
    })


    this.inertia = this.getRotationalInertia()
    this.inverseInertia = this.isStatic ? 0 : 1 / this.inertia
  }

  getKonvaObject() {
    return this.konvaObject
  }

  getRotationalInertia(): number {
    if (this.shape === "Square")
      return (1 / 12) * this.mass * (Math.pow(this.height, 2) + Math.pow(this.width, 2))
    // TODO: Implement moment of inertia for a hexagon
    return 0
  }

  updateKonvaObject() {
    // TODO: Update the vertices instead of the rotation or position
    this.konvaObject.x(this.position.x)
    this.konvaObject.y(this.position.y)
    this.konvaObject.width(this.width)
    this.konvaObject.height(this.height)
    this.konvaObject.fill(this.color)
    this.konvaObject.stroke("red")
    this.konvaObject.rotation(this.rotation)
    if (this.konvaObject instanceof Konva.RegularPolygon)
      this.konvaObject.radius(this.width)
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

  // Convert from the local cartesian system for this object to global world coordinates
  private localToGlobal(v: Vector2D): Vector2D {
    return this.position.add(v.rotate(this.rotation))
  }

  getTransformedVertices(): Vector2D[] {
    let res = []
    for (const v of this.vertices)
      res.push(this.localToGlobal(v))
    return res
  }

  step(dt: number) {
    if (this.beingDragged || this.isStatic)
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

  move(v: Vector2D) {
    if (this.isStatic) return
    this.position = this.position.add(v)
  }
}
