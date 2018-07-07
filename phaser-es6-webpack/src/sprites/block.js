import Phaser from 'phaser'
export default class extends Phaser.Graphics {
  constructor (game, x, y, obj) {
    super(game, x, y)
    this.game = game
    this.x = x
    this.y = y
    this.score = 10
    
    this.anchor.setTo(0.5)
    
    this.obj = obj
    
    this.beginFill(0xffee50, 1)
    this.drawRect(-20, -20, 40, 40)
    this.endFill()
    
    game.physics.p2.enable(this, false, false)
    this.body.createGroupCallback(
      this.obj,
      function (myBody, otherBody) {
        // myBody.sprite.decScore()
      },
      this
    )
    this.body.setRectangle(40, 40, 0, 0)
    this.body.static = true
    this.body.centerX = 10
    this.body.centerY = 10
    this.body.angularVelocity = 1
    
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