import Phaser from 'phaser'

export default class Texture {
  constructor (game) {
    this.game = game

    let block = new Phaser.Graphics(this.game, 0, 0)
    let circle = new Phaser.Graphics(this.game, 0, 0)
    let triangle = new Phaser.Graphics(this.game, 0, 0)
    let pentagon = new Phaser.Graphics(this.game, 0, 0)
    let ball = new Phaser.Graphics(this.game, 0, 0)

    block.beginFill(0xffee50, 1)
    block.drawRect(-20, -20, 40, 40)
    block.endFill()

    circle.beginFill(0xffee50, 1)
    circle.drawCircle(0, 0, 40)
    circle.endFill()

    triangle.beginFill(0xffee50)
    triangle.drawPolygon([0, 20, -20, -14, 20, -14])
    triangle.endFill()

    pentagon.beginFill(0xffee50)
    pentagon.drawPolygon([12.5, -17.12, 20.2, 6.65, 0, 21.25, -20.2, 7.6, -12.5, -17.12])
    pentagon.endFill()

    ball.beginFill(0xff0000)
    ball.drawCircle(0, 0, 20)
    ball.endFill()

    this.blockTexture = block.generateTexture()
    this.circleTexture = circle.generateTexture()
    this.triangleTexture = triangle.generateTexture()
    this.pentagonTexture = pentagon.generateTexture()
    this.ballTexture = ball.generateTexture()
  }
}