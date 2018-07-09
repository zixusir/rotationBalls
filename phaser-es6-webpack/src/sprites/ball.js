import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y)
    this.game = game
    this.x = x
    this.y = y
    this.inCollision = false

    this.anchor.setTo(0.5)

    this.graphic = new Phaser.Graphics(this.game, 0, 0)
    this.graphic.beginFill(0xff0000)
    this.graphic.drawCircle(0, 0, 30)
    this.graphic.endFill()

    game.physics.p2.enable(this, false, false)
    this.body.setCircle(10)
    this.body.static = false
    this.create()
  }
  create () {
  }

  update () {
    if (this.body.y > this.game.height - 50) {
      this.inCollision = false
      this.body.setZeroVelocity()
      this.body.x = this.game.width / 2
      this.body.y = 0
    }
  }
}