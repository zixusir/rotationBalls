import Phaser from 'phaser'
import Data from '../states/Data'

export default class extends Phaser.State {
  constructor () {
    super()
    this.asset = null
    this.score = 0
    this.highestScore = 0
  }
  init () {
    this.score = Data.score
    this.highestScore = Data.hScore
  }

  preload () { }

  create () {
    this.stage.backgroundColor = '#ff0030'
    // game.input.enabled = false
    // System.input.enabled = true
    this.text1 = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2 - 200, 'GAME OVER', {
      font: '40px',
      fill: '#ffee00',
      align: 'center'
    })
    this.text1.anchor.setTo(0.5)

    this.uScore = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2 - 150, `Your Score: ${this.score}`, {
      font: '20px',
      fill: '#ffee00',
      align: 'center'
    })
    this.uScore.anchor.setTo(0.5)

    this.hScore = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2 - 100, `Highest Score: ${this.highestScore}`, {
      font: '20px',
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
    this.textSprite = new Phaser.Sprite(this.game, this.game.width / 2, this.game.height / 2, this.textTexture)

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
      this.state.start('Game')
    }, this)
  }
  update () {}
}
>>>>>>> 5576bffc380d0ce046f57e22a0593bdfe450b2fc