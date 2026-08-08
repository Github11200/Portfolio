import { Object } from "./object";
import Vector2D from "./vector";

type CollisionResult = { colliding: boolean, depth: number, normal: Vector2D }
type PointSegmentDistance = { distance: number, contactPoint: Vector2D }
type ContactPoints = { pointOne: Vector2D, pointTwo: Vector2D | null }

export default class CollisionHelper {
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

  private findContactPoints(verticesA: Vector2D[], verticesB: Vector2D[]): ContactPoints {
    let contactPointOne = new Vector2D(0, 0)
    let contactPointTwo = null
    let minimumDistance = Infinity

    for (let i = 0; i < verticesA.length; ++i) {
      const vertex = verticesA[i]

      // Go through the edge segments of B
      for (let j = 0; j < verticesB.length; ++j) {
        const res = this.pointSegmentDistance(verticesB[j], verticesB[(j + 1) % verticesB.length], vertex)

        // If this new contact point is the same distance and it's not the
        // same one that's already been used then update the points
        if (res.distance === minimumDistance && !res.contactPoint.nearlyEqual(contactPointOne))
          contactPointTwo = res.contactPoint
        else if (res.distance < minimumDistance) {
          contactPointOne = res.contactPoint
          contactPointTwo = new Vector2D(0, 0)

          minimumDistance = res.distance
        }
      }
    }

    for (let i = 0; i < verticesB.length; ++i) {
      const vertex = verticesB[i]

      // Go through the edge segments of B
      for (let j = 0; j < verticesA.length; ++j) {
        const res = this.pointSegmentDistance(verticesA[j], verticesA[(j + 1) % verticesA.length], vertex)

        // If this new contact point is the same distance and it's not the
        // same one that's already been used then update the points
        if (res.distance === minimumDistance && !res.contactPoint.nearlyEqual(contactPointOne))
          contactPointTwo = res.contactPoint
        else if (res.distance < minimumDistance) {
          contactPointOne = res.contactPoint
          contactPointTwo = new Vector2D(0, 0)

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
      let axis: Vector2D = edge.crossProduct(1).normalize();

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

      const axis: Vector2D = edge.crossProduct(1).normalize();

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

  overlaps(object1: Object, object2: Object) {
    const bb1 = object1.getAABB()
    const bb2 = object2.getAABB()

    return ((bb1.maxX >= bb2.minX && bb1.minX <= bb2.maxX)) &&
      ((bb1.maxY >= bb2.minY && bb1.minY <= bb2.maxY))
  }

  checkCollision(object1: Object, object2: Object): CollisionResult {
    if (!this.overlaps(object1, object2))
      return { colliding: false, depth: 0, normal: new Vector2D(0, 0) };

    return this.SATCollisionDetection(object1.getTransformedVertices(), object2.getTransformedVertices());
  }

  resolveCollision(object1: Object, object2: Object, normal: Vector2D, depth: number) {
    const restitution = Math.min(object1.restitution, object2.restitution)
    const relativeVelocity = object2.velocity.subtract(object1.velocity)
    const inverseMass1 = object1.isStatic ? 0 : 1 / object1.mass
    const inverseMass2 = object2.isStatic ? 0 : 1 / object2.mass
    const inverseMassSum = inverseMass1 + inverseMass2

    if (inverseMassSum === 0)
      return

    const velocityAlongNormal = relativeVelocity.dot(normal)

    if (velocityAlongNormal > 0)
      return

    const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / inverseMassSum

    const impulse = normal.scale(impulseMagnitude)

    object1.velocity = object1.velocity.subtract(impulse.scale(inverseMass1))
    object2.velocity = object2.velocity.add(impulse.scale(inverseMass2))

    const correction = normal.scale(depth / inverseMassSum)
    object1.move(correction.scale(-inverseMass1))
    object2.move(correction.scale(inverseMass2))

    // TODO: Fix the contact points function, it's tweaking out 
    const contactPoints = this.findContactPoints(object1.getTransformedVertices(), object2.getTransformedVertices())
  }
}