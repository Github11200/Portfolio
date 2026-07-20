import type Object from "./object";
import Vector2D from "./vector";

export default class World {
  objects: Object[] = []
  gravity: Vector2D = new Vector2D(0, 0.001)

  constructor(objects: Object[]) {
    this.objects = objects
  }

  step(dt: number) {
    for (let object of this.objects)
      object.velocity = object.velocity.add(this.gravity.scale(dt))

    for (let object of this.objects)
      object.step(dt)
  }
}