import { Object } from "./object";
import Vector2D from "./vector";

const epsilon = 1.5

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
    let impulses = []
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

      // The bodies are moving away, so we don't need to resolve the collision
      if (contactVelocityMagnitude >= 0)
        continue

      // Get the perpendicular values
      const raPerpendicularDotNormal = raPerpendicular.dot(normal)
      const rbPerpendicularDotNormal = rbPerpendicular.dot(normal)

      const inverseMassSum = objectA.inverseMass + objectB.inverseMass +
        Math.pow(raPerpendicularDotNormal, 2) * objectA.inverseInertia +
        Math.pow(rbPerpendicularDotNormal, 2) * objectB.inverseInertia

      if (inverseMassSum === 0)
        continue

      let impulseMagnitude = -(1 + restitution) * contactVelocityMagnitude
      impulseMagnitude /= inverseMassSum

      // If we have 2 contact points, then each point should get half of the impulse
      impulseMagnitude /= contacts.length

      const impulse = normal.scale(impulseMagnitude)

      impulses.push(impulse)
      raList.push(ra)
      rbList.push(rb)
    }

    // Apply the impulses after calculating them because if there are 2 
    // contact points then applying one impulse will affect the second
    for (let i = 0; i < impulses.length; ++i) {
      const impulse = impulses[i]

      // Use cross products for the angular velocity so if the impulse is pointing 90 degrees
      // it has a stronger effect than if it was pointing in the same direction as ra
      objectA.velocity = objectA.velocity.subtract(impulse.scale(objectA.inverseMass))
      objectA.angularVelocity -= raList[i].crossProduct(impulse) * objectA.inverseInertia

      objectB.velocity = objectB.velocity.add(impulse.scale(objectB.inverseMass))
      objectB.angularVelocity += rbList[i].crossProduct(impulse) * objectB.inverseInertia
    }
  }
}