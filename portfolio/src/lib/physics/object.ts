import type { AABB } from "$lib/types";
import Konva from "konva";
import Vector2D from "./vector";
import logo from "../../../static/logo.svg"

type Shape = "Square" | "Hexagon"

interface ObjectProperties {
  position: Vector2D,
  velocity: Vector2D,
  angularVelocity: number,
  rotation: number,
  mass: number,
  restitution: number,
  isStatic: boolean,
  shape: Shape,
  color: string,
  id: string
  width: number,
  height: number,
  staticFriction: number,
  dynamicFriction: number
}

export abstract class Object {
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

  staticFriction: number = 0 // The friction right when you start moving an object
  dynamicFriction: number = 0 // The friction while the object is moving

  force: Vector2D = new Vector2D(0, 0)

  width: number = 0
  height: number = 0
  color: string = ""
  shape: Shape

  id: string = ""

  vertices: Vector2D[] = []

  konvaObject: Konva.RegularPolygon | Konva.Rect | Konva.Group
  beingDragged: boolean = false

  constructor({
    position,
    velocity,
    angularVelocity,
    rotation,
    mass,
    restitution,
    isStatic,
    width,
    height,
    shape,
    color,
    id,
    staticFriction,
    dynamicFriction }: ObjectProperties) {
    this.position = position
    this.velocity = velocity
    this.angularVelocity = angularVelocity
    this.rotation = rotation
    this.restitution = restitution
    this.isStatic = isStatic
    this.staticFriction = staticFriction
    this.dynamicFriction = dynamicFriction

    this.mass = mass
    this.inverseMass = this.isStatic ? 0 : 1 / this.mass

    this.width = width
    this.height = height
    this.color = color
    this.shape = shape

    this.id = id
    this.vertices = this.generateVertices()

    this.konvaObject = this.createKonvaObject()

    // @ts-ignore
    this.konvaObject.on("dragstart", () => { this.beingDragged = true })
    // @ts-ignore
    this.konvaObject.on("dragend", () => { this.beingDragged = false })
    // @ts-ignore
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

  abstract createKonvaObject(): Konva.Rect | Konva.RegularPolygon | Konva.Group
  abstract getRotationalInertia(): number
  abstract generateVertices(): Vector2D[]

  updateKonvaObject() {
    this.konvaObject.x(this.position.x)
    this.konvaObject.y(this.position.y)

    if (!(this.konvaObject instanceof Konva.Group)) {
      this.konvaObject.fill(this.color)
      this.konvaObject.stroke("red")
    }
    this.konvaObject.rotation(this.rotation * (180 / Math.PI))

    if (this.konvaObject instanceof Konva.RegularPolygon)
      this.konvaObject.radius(this.width)
    else {
      this.konvaObject.width(this.width)
      this.konvaObject.height(this.height)
    }
  }

  applyForce(force: Vector2D) {
    this.force = this.force.add(force);
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

export class Box extends Object {
  createKonvaObject() {
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
  }

  generateVertices(): Vector2D[] {
    return [
      new Vector2D(-this.width / 2, this.height / 2),
      new Vector2D(this.width / 2, this.height / 2),
      new Vector2D(this.width / 2, -this.height / 2),
      new Vector2D(-this.width / 2, -this.height / 2),
    ]
  }

  getRotationalInertia(): number {
    return (1 / 12) * this.mass * (Math.pow(this.height, 2) + Math.pow(this.width, 2))
  }
}

export class Hexagon extends Object {
  createKonvaObject() {
    const imageObject = new Image()
    imageObject.src = logo

    const group = new Konva.Group({
      width: 200,
      height: 200,
    })

    const image = new Konva.Image({
      image: imageObject,
      x: 0,
      y: 0,
      width: this.width * 2,
      height: this.width * 2,
      offsetX: this.width,
      offsetY: this.width,
      rotation: (Math.PI) / 3
    })

    const polygon = new Konva.RegularPolygon({
      x: 0,
      y: 0,
      fill: this.color,
      stroke: this.color,
      draggable: true,
      sides: 6,
      radius: this.width,
      rotation: this.rotation,
    });

    group.add(polygon)
    group.add(image)

    return group
  }

  generateVertices(): Vector2D[] {
    let generatedVertices = []
    for (let i = 0; i < 6; ++i) {
      const angle = (Math.PI / 3) * i + (Math.PI / 6);
      generatedVertices.push(new Vector2D(this.width * Math.cos(angle), this.width * Math.sin(angle)))
    }

    return generatedVertices
  }

  getRotationalInertia(): number {
    return (5 / 12) * this.mass * Math.pow(this.width, 2)
  }
}