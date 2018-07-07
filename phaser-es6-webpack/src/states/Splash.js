import Phaser from 'phaser'

export default class extends Phaser.State {
  constructor () {
    super()
    this.asset = null
    this.ready = false
  }

  preload () {
    //
    // load your assets
    //
    this.load.image('loadbar', 'assets/images/loader-bar.png')
  }

  create () {
    // this.stage.backgroundColor = '#ff0055'
    this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'loadbar')
    this.asset.anchor.setTo(0.5, 0.5)
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.load.setPreloadSprite(this.asset)

    this.text = this.add.text(this.game.width / 2, this.game.height / 2 - 100, 'zixu Game', {
      font: '50px',
      fill: '#00ffee',
      smoothed: false
    })
    this.text.anchor.setTo(0.5)
    // do all your loading here
    // this.load.image('player', 'assets/images/player.png')
    // width and height of sprite
    this.load.image('mushroom', 'assets/images/mushroom2.png')

    // start load
    this.load.start()
  }

  update () {
    if (this.ready) {
      this.game.state.start('Game')
      // this.game.state.start('Over')
    }
  }

  onLoadComplete () {
    this.ready = true
  }
}
