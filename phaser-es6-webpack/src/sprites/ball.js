import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor (game, x, y, texture) {
    super(game, x, y)
    this.game = game
    this.x = x
    this.y = y
    this.inCollision = false

    this.anchor.setTo(0.5)
    
    this.loadTexture(texture)

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
      // this.body.x = this.game.width / 2
      // this.body.y = 0
      this.body.reset(this.game.width / 2, 0)
    }
  }
}