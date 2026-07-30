import { Object } from "./object";
import Vector2D from "./vector";

export default class CollisionHelper {
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

  SATCollisionDetection(verticesA: Vector2D[], verticesB: Vector2D[]): boolean {
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
      if (minB >= maxA || minA >= maxB) return false
    }

    // Go through the vertices in B
    for (let i = 0; i < verticesB.length; ++i) {
      const va: Vector2D = verticesB[i];
      const vb: Vector2D = verticesB[(i + 1) % verticesB.length];

      const edge: Vector2D = vb.subtract(va);

      const axis: Vector2D = edge.crossProduct(1);

      const { min: minA, max: maxA } = this.projectVertices(verticesA, axis)
      const { min: minB, max: maxB } = this.projectVertices(verticesB, axis)

      if (minB >= maxA || minA >= maxB) return false
    }

    // There is no axis where they are separated so they are colliding
    return true;
  }

  overlaps(object1: Object, object2: Object) {
    const bb1 = object1.getAABB()
    const bb2 = object2.getAABB()
    // console.log(bb1)
    // console.log(bb2)
    // console.log("\n")

    return ((bb1.maxX >= bb2.minX && bb1.minX <= bb2.maxX)) &&
      ((bb1.maxY >= bb2.minY && bb1.minY <= bb2.maxY))
  }

  checkCollision(object1: Object, object2: Object): boolean {
    // console.log(this.overlaps(object1, object2))
    if (!this.overlaps(object1, object2))
      return false;

    return this.SATCollisionDetection(object1.getTransformedVertices(), object2.getTransformedVertices());
  }
} 