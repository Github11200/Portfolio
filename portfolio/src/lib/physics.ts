import type { AABB } from "$lib/types";
import Konva from "konva";

/*************************
         Vector
************************/

const epsilon = 1e-2

export class Vector2D {
  x = 0
  y = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  private numbersNearlyEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < epsilon
  }

  nearlyEqual(v: Vector2D) {
    return this.numbersNearlyEqual(this.x, v.x) && this.numbersNearlyEqual(this.y, v.y)
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

  scalarCrossProduct(scaler: number) {
    return new Vector2D(-this.y * scaler, this.x * scaler)
  }

  crossProduct(v: Vector2D) {
    return this.x * v.y - this.y * v.x
  }

  // Apply a rotation matrix to rotate a vector by some number of radians
  rotate(angle: number) {
    return new Vector2D(this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }

  normalize() {
    return new Vector2D(this.x / this.magnitude(), this.y / this.magnitude())
  }

  distanceTo(v: Vector2D) {
    return Math.sqrt(Math.pow(v.x - this.x, 2) + Math.pow(v.y - this.y, 2))
  }
}


/*************************
         OBJECT
************************/

interface ObjectProperties {
  position: Vector2D,
  velocity: Vector2D,
  angularVelocity: number,
  rotation: number,
  mass: number,
  restitution: number,
  isStatic: boolean,
  width: number,
  height: number,
  staticFriction: number,
  dynamicFriction: number,
  logoSrc: string
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

  id: string = ""
  logoSrc: string = ""

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
    staticFriction,
    dynamicFriction,
    logoSrc }: ObjectProperties) {
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

    this.logoSrc = logoSrc
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
    const imageObject = new Image()
    imageObject.src = this.logoSrc

    const group = new Konva.Group({
      draggable: true
    })

    const image = new Konva.Image({
      image: imageObject,
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      offsetX: this.width / 2,
      offsetY: this.height / 2,
      rotation: 0
    })

    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      offsetX: this.width / 2,
      offsetY: this.height / 2,
    })

    group.add(rect)
    group.add(image)

    return group
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
    imageObject.src = this.logoSrc

    const group = new Konva.Group({
      draggable: true
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

/*************************
         Collisons
************************/

type CollisionResult = { colliding: boolean, depth: number, normal: Vector2D }
type PointSegmentDistance = { distance: number, contactPoint: Vector2D }
type ContactPoints = { pointOne: Vector2D, pointTwo: Vector2D | null }

export class CollisionHelper {
  // Get the distance between a point and a line (essentially finding the perpendicular line)
  pointSegmentDistance(p: Vector2D, a: Vector2D, b: Vector2D): PointSegmentDistance {
    let ab = b.subtract(a);
    let ap = p.subtract(a);

    let dot = ap.dot(ab);
    let d = dot / Math.pow(ab.magnitude(), 2)

    let contact = new Vector2D(0, 0)
    if (d <= 0)
      contact = a
    else if (d >= 1)
      contact = b
    else
      contact = a.add(ab.scale(d))

    return {
      contactPoint: contact,
      distance: contact.distanceTo(p)
    }
  }

  findContactPoints(verticesA: Vector2D[], verticesB: Vector2D[]): ContactPoints {
    let contactPointOne = new Vector2D(0, 0)
    let contactPointTwo = null
    let minimumDistance = Infinity


    for (let i = 0; i < verticesA.length; ++i) {
      const vertex = verticesA[i]

      // Go through the edge segments of B
      for (let j = 0; j < verticesB.length; ++j) {
        const res = this.pointSegmentDistance(vertex, verticesB[j], verticesB[(j + 1) % verticesB.length])

        // If this new contact point is the same distance and it's not the
        // same one that's already been used then update the points
        if (Math.abs(res.distance - minimumDistance) < epsilon && !res.contactPoint.nearlyEqual(contactPointOne))
          contactPointTwo = res.contactPoint
        else if (res.distance < minimumDistance) {
          contactPointOne = res.contactPoint
          contactPointTwo = null

          minimumDistance = res.distance
        }
      }
    }

    for (let i = 0; i < verticesB.length; ++i) {
      const vertex = verticesB[i]

      // Go through the edge segments of B
      for (let j = 0; j < verticesA.length; ++j) {
        const res = this.pointSegmentDistance(vertex, verticesA[j], verticesA[(j + 1) % verticesA.length])

        // If this new contact point is the same distance and it's not the
        // same one that's already been used then update the points
        if (Math.abs(res.distance - minimumDistance) < epsilon && !res.contactPoint.nearlyEqual(contactPointOne))
          contactPointTwo = res.contactPoint
        else if (res.distance < minimumDistance) {
          contactPointOne = res.contactPoint
          contactPointTwo = null

          minimumDistance = res.distance
        }
      }
    }

    return {
      pointOne: contactPointOne,
      pointTwo: contactPointTwo
    }
  }

  // Find the center of the object
  private findArithmeticMean(vertices: Vector2D[]): Vector2D {
    let sumX = 0, sumY = 0
    for (const vertex of vertices) {
      sumX += vertex.x
      sumY += vertex.y
    }

    return new Vector2D(sumX / vertices.length, sumY / vertices.length)
  }

  projectVertices(vertices: Vector2D[], axis: Vector2D): {
    min: number,
    max: number
  } {
    let min = Infinity, max = -Infinity;
    for (const v of vertices) {
      const projection = v.dot(axis)

      if (projection < min) min = projection
      if (projection > max) max = projection
    }

    return {
      min: min,
      max: max
    }
  }

  // FIXME: Refactor the function so the loops aren't repeated
  SATCollisionDetection(verticesA: Vector2D[], verticesB: Vector2D[]): CollisionResult {
    let normal = new Vector2D(0, 0);
    let depth = Infinity

    for (let i = 0; i < verticesA.length; ++i) {
      const va: Vector2D = verticesA[i];
      const vb: Vector2D = verticesA[(i + 1) % verticesA.length];

      const edge: Vector2D = vb.subtract(va);

      // Get the perpendicular vector by swapping the coordinates
      // and multiplying the y coordinate by -1
      let axis: Vector2D = edge.scalarCrossProduct(1).normalize();

      const { min: minA, max: maxA } = this.projectVertices(verticesA, axis)
      const { min: minB, max: maxB } = this.projectVertices(verticesB, axis)

      // If this is the one axis where they aren't
      // intersecting then we can return false
      if (minB >= maxA || minA >= maxB)
        return {
          colliding: false,
          depth: depth,
          normal: normal
        }

      let axisDepth = Math.min(maxA - minB, maxB - minA)
      if (axisDepth < depth) {
        depth = axisDepth
        normal = axis
      }
    }

    // Go through the vertices in B
    for (let i = 0; i < verticesB.length; ++i) {
      const va: Vector2D = verticesB[i];
      const vb: Vector2D = verticesB[(i + 1) % verticesB.length];

      const edge: Vector2D = vb.subtract(va);

      const axis: Vector2D = edge.scalarCrossProduct(1).normalize();

      const { min: minA, max: maxA } = this.projectVertices(verticesA, axis)
      const { min: minB, max: maxB } = this.projectVertices(verticesB, axis)

      if (minB >= maxA || minA >= maxB)
        return {
          colliding: false,
          depth: depth,
          normal: normal
        }

      let axisDepth = Math.min(maxA - minB, maxB - minA)
      if (axisDepth < depth) {
        depth = axisDepth
        normal = axis
      }
    }

    let objectACenter = this.findArithmeticMean(verticesA)
    let objectBCenter = this.findArithmeticMean(verticesB)

    let direction = objectBCenter.subtract(objectACenter)

    // If the normal is pointing the other way then flip it
    if (direction.dot(normal) < 0)
      normal = normal.scale(-1);

    // There is no axis where they are separated so they are colliding
    return { colliding: true, depth: depth, normal: normal };
  }

  overlaps(objectA: Object, objectB: Object) {
    const bb1 = objectA.getAABB()
    const bb2 = objectB.getAABB()

    return ((bb1.maxX >= bb2.minX && bb1.minX <= bb2.maxX)) &&
      ((bb1.maxY >= bb2.minY && bb1.minY <= bb2.maxY))
  }

  checkCollision(object1: Object, object2: Object): CollisionResult {
    if (!this.overlaps(object1, object2))
      return { colliding: false, depth: 0, normal: new Vector2D(0, 0) };

    return this.SATCollisionDetection(object1.getTransformedVertices(), object2.getTransformedVertices());
  }

  resolveCollision(objectA: Object, objectB: Object, normal: Vector2D, depth: number) {
    const contactPoints = this.findContactPoints(objectA.getTransformedVertices(), objectB.getTransformedVertices())
    const contacts = [contactPoints.pointOne]
    if (contactPoints.pointTwo !== null) contacts.push(contactPoints.pointTwo)

    const restitution = Math.min(objectA.restitution, objectB.restitution)
    const staticFriction = (objectA.staticFriction + objectB.staticFriction) / 2
    const dynamicFriction = (objectA.dynamicFriction + objectB.dynamicFriction) / 2

    let impulses = []
    let frictionImpulses = []
    let raList = []
    let rbList = []

    if (objectA.inverseMass + objectB.inverseMass > 0) {
      const slop = 0.01
      const percent = 0.2
      const correctionMagnitude = Math.max(depth - slop, 0) * percent / (objectA.inverseMass + objectB.inverseMass)
      const correction = normal.scale(correctionMagnitude)

      objectA.move(correction.scale(-objectA.inverseMass))
      objectB.move(correction.scale(objectB.inverseMass))
    }

    for (let i = 0; i < contacts.length; ++i) {
      // Get the radius from the object center to the point of collision
      const ra = contacts[i].subtract(objectA.position)
      const rb = contacts[i].subtract(objectB.position)

      // Find the perpendicular vectors for the angular velocity
      const raPerpendicular = ra.scalarCrossProduct(1)
      const rbPerpendicular = rb.scalarCrossProduct(1)

      const angularLinearVelocityA = raPerpendicular.scale(objectA.angularVelocity)
      const angularLinearVelocityB = rbPerpendicular.scale(objectB.angularVelocity)

      const objectAVelocity = angularLinearVelocityA.add(objectA.velocity)
      const objectBVelocity = angularLinearVelocityB.add(objectB.velocity)

      const relativeVelocity = objectBVelocity.subtract(objectAVelocity)

      const contactVelocityMagnitude = relativeVelocity.dot(normal)

      // Calculate the tangent velocity by first projecting the relative velocity onto the normal vector and then
      // scaling the normal to that value, and then subtracting those two to get the tangent vector
      let tangent = relativeVelocity.subtract(normal.scale(contactVelocityMagnitude))

      // The bodies are moving away, so we don't need to resolve the collision
      if (contactVelocityMagnitude >= 0)
        continue

      const calculateImpulse = (vector: Vector2D, isFrictionImpulse: boolean, normalImpulseMagnitude: number = 0): Vector2D => {
        // Get the perpendicular values
        const raPerpendicularDotNormal = raPerpendicular.dot(vector)
        const rbPerpendicularDotNormal = rbPerpendicular.dot(vector)

        const inverseMassSum = objectA.inverseMass + objectB.inverseMass +
          Math.pow(raPerpendicularDotNormal, 2) * objectA.inverseInertia +
          Math.pow(rbPerpendicularDotNormal, 2) * objectB.inverseInertia

        if (inverseMassSum === 0)
          return new Vector2D(0, 0)

        let c = -(1 + restitution)
        if (isFrictionImpulse)
          c = -1

        let impulseMagnitude = c * contactVelocityMagnitude
        impulseMagnitude /= inverseMassSum

        // If we have 2 contact points, then each point should get half of the impulse
        impulseMagnitude /= contacts.length

        let impulse = vector.scale(impulseMagnitude)
        if (isFrictionImpulse && Math.abs(impulseMagnitude) > normalImpulseMagnitude * staticFriction)
          impulse = vector.scale(normalImpulseMagnitude * dynamicFriction)

        return isFrictionImpulse ? impulse.scale(-1) : impulse
      }

      impulses.push(calculateImpulse(normal, false))

      // If the tangent is 0 then there is no friction to apply
      if (tangent.nearlyEqual(new Vector2D(0, 0)))
        frictionImpulses.push(new Vector2D(0, 0))
      else {
        tangent = tangent.normalize()
        frictionImpulses.push(calculateImpulse(tangent, true, impulses.at(-1)?.magnitude()))
      }
      raList.push(ra)
      rbList.push(rb)
    }

    const applyImpulse = (impulse: Vector2D, i: number) => {
      // Use cross products for the angular velocity so if the impulse is pointing 90 degrees
      // it has a stronger effect than if it was pointing in the same direction as ra
      objectA.velocity = objectA.velocity.subtract(impulse.scale(objectA.inverseMass))
      objectA.angularVelocity -= raList[i].crossProduct(impulse) * objectA.inverseInertia

      objectB.velocity = objectB.velocity.add(impulse.scale(objectB.inverseMass))
      objectB.angularVelocity += rbList[i].crossProduct(impulse) * objectB.inverseInertia
    }

    // Apply the impulses after calculating them because if there are 2 
    // contact points then applying one impulse will affect the second
    for (let i = 0; i < impulses.length; ++i)
      applyImpulse(impulses[i], i)
    for (let i = 0; i < frictionImpulses.length; ++i)
      applyImpulse(frictionImpulses[i], i)
  }
}

/*************************
         World
************************/

export class World {
  objects: Object[] = []
  gravity: Vector2D = new Vector2D(0, 0.001)
  collisionHelper = new CollisionHelper();
  iterations = 20

  constructor(objects: Object[]) {
    this.objects = objects
  }

  checkCollisions() {
    for (let i = 0; i < this.objects.length; ++i) {
      for (let j = i + 1; j < this.objects.length; ++j) {
        const collisionResult = this.collisionHelper.checkCollision(this.objects[i], this.objects[j])

        // Resolve the collision
        if (collisionResult.colliding)
          this.collisionHelper.resolveCollision(this.objects[i], this.objects[j], collisionResult.normal, collisionResult.depth)
      }
    }
  }

  updateGravity() {

  }

  step(dt: number) {
    for (let i = 0; i < this.iterations; ++i) {
      for (let object of this.objects)
        object.applyForce(this.gravity.scale(object.mass));

      for (let object of this.objects)
        object.step(dt / this.iterations)

      this.checkCollisions()
    }
  }
}