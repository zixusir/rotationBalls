import Phaser from 'phaser'
export default class extends Phaser.Sprite {
  constructor (game, x, y, obj) {
    super(game, x, y)
    this.game = game
    this.x = x
    this.y = y
    this.score = 10

    // this.moveTo(x, y)

    this.obj = obj

    game.physics.p2.enable(this, false, false)
    this.body.createGroupCallback(
      this.obj,
      function (myBody, otherBody) {
        // myBody.sprite.decScore()
      },
      this
    )

    this.graphic = new Phaser.Graphics(this.game, 0, 0)

    this.graphic.beginFill(0xffee50)
    this.graphic.drawPolygon([12.5, -17.12, 20.2, 6.65, 0, 21.25, -20.2, 7.6, -12.5, -17.12])
    this.graphic.endFill()

    this.loadTexture(this.graphic.generateTexture())

    // this.body.offset = new Phaser.Point(-33, -65)
    this.body.clearShapes()
    this.body.addPolygon({}, [12.5, -17.12, 20.2, 6.65, 0, 21.25, -20.2, 7.6, -12.5, -17.12])
    this.body.static = true
    this.body.angularVelocity = -1
    this.body.adjustCenterOfMass()

    this.signal = new Phaser.Signal()
    // this.signal.dispatch()
    this.create()
  }
  create () {
    this.text = new Phaser.Text(this.game, 0, 0, this.score,{
      font: '20px',
      fill: '#ff00ee',
      align: 'center'
    })
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)
  }

  decScore () {
    this.score--
    this.text.setText(this.score)
    if (this.score < 1) {
      this.kill()
    }
  }

  update () {
    this.text.angle = -this.body.angle
    if (this.body.y < 130) {
      this.signal.dispatch()
    }
  }
}
