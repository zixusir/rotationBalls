import 'pixi'
import 'p2'
import Phaser from 'phaser'

import SplashState from './states/Splash'
import GameState from './states/Game'
import OverState from './states/Over'

// console in mobile chrome
// import Eruda from 'eruda'
// Eruda.init()

// class Game extends Phaser.Game {
//   constructor () {
//     const docElement = document.documentElement
//     const width = docElement.clientWidth
//     const height = docElement.clientHeight
//     super(width * 2, height * 2, Phaser.CANVAS, 'content') // width and height * 2 to solove not clear show in HD screen

//     // this.state.add('Boot', BootState, false)
//     this.state.add('Splash', SplashState, false)
//     this.state.add('Game', GameState, false)
//     this.state.add('Over', OverState, false)

//     // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
//     if (!window.cordova) {
//       this.state.start('Splash')
//     }
//   }
// }

// window.game = new Game()

const docElement = document.documentElement
const width = docElement.clientWidth
const height = docElement.clientHeight
let game
window.onload = function () {
  game = new Phaser.Game(width * 1, height * 1, Phaser.CANVAS, 'game')
  game.state.add('Splash', SplashState)
  game.state.add('Game', GameState)
  game.state.add('Over', OverState)
  game.state.start('Splash')
}

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready')

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot')
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id)
    }
  }

  app.initialize()
}
