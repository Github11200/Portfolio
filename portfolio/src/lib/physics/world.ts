import CollisionHelper from "./collisions";
import { Object } from "./object";
import Vector2D from "./vector";

export default class World {
  objects: Object[] = []
  gravity: Vector2D = new Vector2D(0, 0)
  damping: number = 0.98
  collisionHelper = new CollisionHelper();

  constructor(objects: Object[]) {
    this.objects = objects
  }

  resolveCollisions() {
    for (let i = 0; i < this.objects.length; ++i) {
      for (let j = i + 1; j < this.objects.length; ++j) {
        this.collisionHelper.checkCollision(this.objects[i], this.objects[j])
      }
    }
  }

  step(dt: number) {
    for (let object of this.objects)
      object.applyForce(this.gravity.scale(object.mass));

    for (let object of this.objects) {
      object.step(dt)
      object.velocity = object.velocity.scale(this.damping)
    }

    this.resolveCollisions()
  }
}