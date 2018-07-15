import 'pixi'
import 'p2'
import Phaser from 'phaser'

import SplashState from './states/Splash'
import GameState from './states/Game'
import OverState from './states/Over'
// import Texture from './sprites/texture'

// console in mobile chrome
// import Eruda from 'eruda'
// Eruda.init()

const docElement = document.documentElement
const width = docElement.clientWidth
const height = docElement.clientHeight
let game = new Phaser.Game(width * 1, height * 1, Phaser.CANVAS, 'game')
console.log(game)
window.onload = function () {
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
