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

  resolveCollision(object1: Object, object2: Object, normal: Vector2D, depth: number) {
    let restitution = Math.min(object1.restitution, object2.restitution)
    let relativeVelocity = object2.velocity.subtract(object1.velocity)

    let numerator = relativeVelocity.dot(normal) * (restitution - 1)
    let denominator = (1 / object1.mass) + (1 / object2.mass)

    let impulse = numerator / denominator

    object1.velocity = object1.velocity.subtract(normal.scale(impulse / object1.mass))
    object2.velocity = object2.velocity.add(normal.scale(impulse / object2.mass))

    const correction = normal.scale((depth / 2) * 0.8)
    object1.position = object1.position.subtract(correction)
    object2.position = object2.position.add(correction)
  }

  checkCollisions() {
    for (let i = 0; i < this.objects.length; ++i) {
      for (let j = i + 1; j < this.objects.length; ++j) {
        const collisionResult = this.collisionHelper.checkCollision(this.objects[i], this.objects[j])

        // Handle the collision
        if (collisionResult.colliding) {
          this.objects[i].color = "blue"
          this.objects[j].color = "blue"

          this.resolveCollision(this.objects[i], this.objects[j], collisionResult.normal, collisionResult.depth)
        }
        else {
          this.objects[i].color = "pink"
          this.objects[j].color = "pink"
        }
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

    this.checkCollisions()
  }
}