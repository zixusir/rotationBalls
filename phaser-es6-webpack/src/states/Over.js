import Phaser from 'phaser'

export default class extends Phaser.State {
  constructor () {
    super()
    this.asset = null
    this.score = 0
    this.highestScore = 0
  }
  init () {
    //this.score = this.game.score
  }

  preload () { }

  create () {
    // game.input.enabled = false
    // System.input.enabled = true
    this.text1 = new Phaser.Text(this.game, this.game.width / 2, 300, 'GAME OVER', {
      font: '80px',
      fill: '#ffee00',
      align: 'center'
    })
    this.text1.anchor.setTo(0.5)

    this.uScore = new Phaser.Text(this.game, this.game.width / 2, 400, `Your Score: ${this.score}`, {
      font: '40px',
      fill: '#ffee00',
      align: 'center'
    })
    this.uScore.anchor.setTo(0.5)

    this.hScore = new Phaser.Text(this.game, this.game.width / 2, 500, `Highest Score: ${this.highestScore}`, {
      font: '40px',
      fill: '#ffee00',
      align: 'center'
    })
    this.hScore.anchor.setTo(0.5)

    this.add.existing(this.uScore)
    this.add.existing(this.hScore)
    this.add.existing(this.text1)

    this.text2 = new Phaser.Graphics(this.game, 0, 0)
    this.text2.beginFill(0xffee00)
    this.text2.drawRoundedRect(0, 0, 200, 75, 5)
    this.text2.endFill()

    this.textTexture = this.text2.generateTexture()
    this.textSprite = new Phaser.Sprite(this.game, this.game.width / 2, this.game.height / 2 + 100, this.textTexture)

    this.textSprite.anchor.setTo(0.5)

    this.text3 = new Phaser.Text(this.game, 0, 0, 'Try Again', {
      font: '40px',
      fill: '#ee5000',
      align: 'center'
    })
    this.text3.anchor.setTo(0.5)
    this.textSprite.addChild(this.text3)
    this.add.existing(this.textSprite)

    this.textSprite.inputEnabled = true
    this.textSprite.events.onInputDown.add(function () {
      console.log('click down')
    }, this)
  }

  update () {}

  render () {
    this.game.debug.inputInfo(this.textSprite, 32, 32)
    this.game.debug.spriteInputInfo(this.textSprite, 32, 130)
  }
}
