import Phaser from 'Phaser'

export default class extends Phaser.state {
  constructor () {
    super()
  }

  init () {
    this.text = this.game.score
  }

  create () {

  }

}