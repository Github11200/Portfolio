import { Object } from "./object";
import Vector2D from "./vector";

type CollisionResult = { colliding: boolean, depth: number, normal: Vector2D }

export default class CollisionHelper {
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
      const axis: Vector2D = edge.crossProduct(1);

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

      const axis: Vector2D = edge.crossProduct(1);

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

    depth /= normal.magnitude()
    normal = normal.normalize()

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
} 