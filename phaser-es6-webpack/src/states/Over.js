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
    game.input.enabled = true
    this.text1 = new Phaser.Text(game, this.game.width / 2, 300, 'GAME OVER', {
      font: '80px',
      fill: '#ffee00',
      align: 'center'
    })
    this.text1.anchor.setTo(0.5)
    
    this.uScore = new Phaser.Text(game, this.game.width / 2, 400, `Your Score: ${this.score}`, {
      font: '40px',
      fill: '#ffee00',
      align: 'center'
    })
    this.uScore.anchor.setTo(0.5)
    
    this.hScore = new Phaser.Text(game, this.game.width / 2, 500, `Highest Score: ${this.highestScore}`, {
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

    this.textTexture  = this.text2.generateTexture()
    let textSprite = this.add.sprite(this.game.width / 2, this.game.height / 2 + 100, this.textTexture)
    
    textSprite.anchor.setTo(0.5)
    
    this.text3 = new Phaser.Text(game, 0, 0, 'Try Again', {
      font: '40px',
      fill: '#ee5000',
      align: 'center'
    })
    this.text3.anchor.setTo(0.5)
    textSprite.addChild(this.text3)
    
    textSprite.inputEnabled = true
   // textSprite.input.enableDrag()
  //  textSprite.input.useHandCursor = true
    textSprite.events.onInputDown.add(this.tapHandler, this)
   
    // this.add.existing(this.text)
  }
  
  tapHandler (sprite) {
    sprite.distory()
    console.log('tap事件触发')
  }
}