import CollisionHelper from "./collisions";
import { Object } from "./object";
import Vector2D from "./vector";

export default class World {
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