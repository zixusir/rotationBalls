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
    this.drawCircle(0, 0, 80)
    this.endFill()
    
    game.physics.p2.enable(this, false, false)
    this.body.createGroupCallback(
      this.obj,
      function (myBody, otherBody) {
        // myBody.sprite.decScore()
      },
      this
    )
    this.body.setCircle(40)
    this.body.static = true
    
    this.signal = new Phaser.Signal()
    this.signal.dispatch()
    this.create()
  }
  create () {
    this.text = new Phaser.Text(this.game, 0, 0, this.score,{
      font: '30px',
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
    if (this.body.y < 300) {
      this.signal.dispatch()
    }
  }
}