import Phaser from 'phaser'
export default class extends Phaser.Graphics {
  constructor (game, x, y, obj) {
    super(game, x, y)
    this.game = game
    this.x = x
    this.y = y
    this.score = 10
    
    this.moveTo(x, y)
    
    this.obj = obj
    
    game.physics.p2.enable(this, false, false)
    this.body.createGroupCallback(
      this.obj,
      function (myBody, otherBody) {
        //myBody.sprite.decScore()
      },
      this
    )
    
    this.beginFill(0xffee50)
    this.drawPolygon([52.9, -29.1, 85.59, 19.1, 0, 81, -85.59, 19.1, -52.59, -29.1])
    this.endFill()
    
    //this.body.offset = new Phaser.Point(-33, -65)
    this.body.clearShapes()
    this.body.addPolygon({},[52.9, -29.1, 85.59, 19.1, 0, 81, -85.59, 19.1, -52.59, -29.1])
    this.body.static = true
    this.body.angularVelocity = -1
    this.body.adjustCenterOfMass()
    
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