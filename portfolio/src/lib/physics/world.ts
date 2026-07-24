import { Object } from "./object";
import Vector2D from "./vector";

export default class World {
  objects: Object[] = []
  gravity: Vector2D = new Vector2D(0, 0)
  damping: number = 0.98

  constructor(objects: Object[]) {
    this.objects = objects
  }

  handleCollisionResponse(objectA: Object, objectB: Object) {

  }

  checkCollision(objectA: Object, objectB: Object) {

  }

  resolveCollisions() {
    for (let i = 0; i < this.objects.length; ++i) {
      for (let j = i + 1; j < this.objects.length; ++j) {

      }
    }
  }

  step(dt: number) {
    for (let object of this.objects)
      object.force = object.force.add(this.gravity.scale(object.mass));

    for (let object of this.objects) {
      object.step(dt)
      object.velocity = object.velocity.scale(this.damping)
    }

    this.resolveCollisions();
  }
}