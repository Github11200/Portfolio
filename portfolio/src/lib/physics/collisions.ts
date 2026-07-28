import { Box, Object } from "./object";

export default class CollisionHelper {
  overlaps(object1: Object, object2: Object) {
    const bb1 = object1.getAABB()
    const bb2 = object2.getAABB()

    return (bb1.maxX >= bb2.minX && bb1.minX <= bb2.maxX) && (bb1.maxX >= bb2.minX && bb1.minX <= bb2.maxX)
  }
} 