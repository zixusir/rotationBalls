import Phaser from 'phaser'

export default class extends Phaser.State {
  constructor () {
    super()
    this.asset = null
  }
  init () {
    this.text = this.game.score
  }

  preload () { }

  create () {
    this.text = new Phaser.Graphics(this.game, 0, 0)
    this.text.beginFill(0xffee00)
    this.text.drawRoundedRect(0, 0, 200, 75, 5)
    this.text.endFill()

    this.textTexture  = this.text.generateTexture()
    this.textSprite = new Phaser.Sprite(game, this.game.width / 2, this.game.height / 2, this.textTexture)
    this.add.existing(this.textSprite)

    this.textSprite.anchor.setTo(0.5)

    // this.add.existing(this.text)
  }
}
