/* globals __DEV__ */
import Phaser from 'phaser'
import Block from '../sprites/block'
import Circle from '../sprites/circle'
import Triangle from '../sprites/triangle'
import Ball from '../sprites/ball'
import Pentagon from '../sprites/Pentagon'
import Data from '../states/Data'
import 'p2'

const PI = 3.1415926

export default class extends Phaser.State {
  constructor () {
    super()
    // 对象池
    this.balls = []
    this.aliveBlocks = []
    this.deadBlocks = []

    // 游戏层级
    this.level = 1
    // 游戏得分
    this.score = 0

    this.hSocre = 0

    this.gameState = true
  }

  init () {
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.gravity.y = 1000
    this.game.physics.p2.restitution = 0.8

    this.stage.backgroundColor = '#ffffff'

    this.balls = []
    this.aliveBlocks = []
    this.deadBlocks = []

    // 游戏层级
    this.level = 1
    // 游戏得分
    this.score = 0

    if (localStorage.hasOwnProperty('hScore')) {
      this.hScore = parseInt(localStorage.getItem('hScore'))
      Data.hScore = this.hScore
    } else {
      this.hScore = 0
    }

    this.gameState = true
  }

  preload () { }

  create () {
    const bannerText = '旋转弹球欢迎你'
    let banner = this.add.text(this.world.centerX, 500, bannerText, {
      font: '50px',
      fill: '#ff0000',
      smoothed: true
    })
    banner.anchor.setTo(0.5)

    this.scoreText = this.add.text(this.game.width - 100, 150, this.score, {
      font: '50px',
      fill: '#ffdd00'
    })

    this.ballsCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.blocksCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.worldCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.lineCollisionGroup = this.game.physics.p2.createCollisionGroup()

    let line1 = this.add.graphics(0, 0)
    line1.beginFill(0xffdd00)
    line1.lineStyle(2, 0x000000)
    line1.moveTo(0, 0)
    line1.lineTo(this.game.width / 2 - 10, 200)
    line1.lineTo(this.game.width / 2 + 10, 200)
    line1.lineTo(this.game.width, 0)
    line1.endFill()
    this.game.physics.p2.enable(line1, true, false)

    line1.body.static = true
    line1.body.x = 0
    line1.body.y = 0
    line1.body.clearShapes()
    let triLength = Math.sqrt(this.game.width * this.game.width / 4 + 200 * 200)
    line1.body.addLine(2 * triLength, 0, 0, 3.14 / 6.5)
    line1.body.addLine(2 * triLength, this.game.width, 0, -3.14 / 6.5)
    line1.body.addLine(this.game.height, 0, this.game.height / 2, 3.1415926 / 2)
    line1.body.addLine(this.game.height, this.game.width, this.game.height / 2, 3.1415926 / 2)
    line1.body.setCollisionGroup(this.lineCollisionGroup)
    line1.body.collides(this.ballsCollisionGroup)
    this.ingame = false
    this.addABall()

    this.game.input.onTap.add(this.moveTo, this)
    // this.game.input.onTap.add(this.print, this)
    this.createNewLine()
  }
  
  update () {
    if (this.ingame) {
      let startNext = true
      for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].inCollision === true) {
          startNext = false
          break
        }
      }
      if (startNext) {
        this.ingame = false
        this.addABall()
        this.createNewLine()
      }
    }
  }

  render () {
    if (__DEV__) {
    }
  }
  // 这里简单地对点击方位进行测试，后期删除
  print (pointer) {
  }

  moveTo (pointer) {
    this.game.input.enabled = false
    this.ingame = true
    console.log(this.balls.length)
    let num = 0
    this.balls[num].inCollision = true
    this.balls[num].body.x = this.game.width / 2
    this.balls[num].body.y = 250
    let direction = Phaser.Math.angleBetween(2 * pointer.x, 2 * pointer.y, this.game.width / 2, 200) - PI / 2
    this.balls[num].body.rotation = direction
    //this.balls[num].body.rotation = this.balls[num].body.rotation + 1
    console.log(this.balls[num].body.rotation)
    this.balls[num].body.moveForward(1000)
    num++
    let timeEvent = this.game.time.events.loop(400, () => {
      if (this.balls[num]) {
        this.balls[num].inCollision = true
        this.balls[num].body.x = this.game.width / 2
        this.balls[num].body.y = 250
        this.balls[num].body.rotation = direction
        this.balls[num].body.moveForward(1000)
        num++
      }
      if (num === this.balls.length) {
        this.game.time.events.remove(timeEvent)
      }
    }, this)
  }
  
  createNewLine () {
    this.game.input.enabled = true
    this.level++
    let adjustX = (this.level%2 === 0 ? 0 : 100)
    let dy = 140
    let dx = this.game.width / 5
    let newObjPos = []
    let num = Math.ceil(Math.random() * 5)
    console.log(`ready to create ${num} new blocks`)
    for (let i = 0; i < num; i++) {
      let posFlag = true
      let np = 0
      while (posFlag) {
        posFlag = false
        np = Math.ceil(Math.random() * (this.level % 2 === 0 ? 5 : 4))
        for (let i = 0; i < newObjPos.length; i++) {
          if (newObjPos[i] === np) {
            posFlag = true
            break
          }
        }
        newObjPos.push(np)
      }
      
      if (this.deadBlocks.length > 0) {
        console.log('block is revived from deadblocks')
        let newBlock = this.deadBlocks.shift()
        newBlock.score = 20
        newBlock.text.setText(newBlock.score)
        newBlock.body.x = dx * (np - 1) + 50 + adjustX
        newBlock.body.y = this.game.height
        this.aliveBlocks.push(newBlock)
        newBlock.revive()
      } else {
        let category = Math.ceil(Math.random() * 4)
        switch (category) {
          case 1:
            let newBlock1 = new Block(this.game, dx * (np - 1) + 50 + adjustX, this.game.height, this.ballsCollisionGroup)
            newBlock1.signal.addOnce(() => {
              console.log('GAME OVER')
              if (this.gameState) {
                this.gameState = false
                this.state.start('Over')
                Data.score = this.score
                localStorage.setItem('score', Data.score.toString())
                if (this.score > this.hScore) {
                  Data.hScore = this.score
                  localStorage.setItem('hScore', this.score.toString())
                }
              }
            })
            this.add.existing(newBlock1)
            this.aliveBlocks.push(newBlock1)
            newBlock1.body.setCollisionGroup(this.blocksCollisionGroup)
            newBlock1.body.collides([this.blocksCollisionGroup, this.ballsCollisionGroup])
            break
          case 2:
            let newBlock2 = new Circle(this.game, dx * (np - 1) + 50 + adjustX, this.game.height, this.ballsCollisionGroup)
            newBlock2.signal.addOnce(() => {
              console.log('GAME OVER')
              if (this.gameState) {
                this.gameState = false
                this.state.start('Over')
                Data.score = this.score
                localStorage.setItem('score', Data.score.toString())
                if (this.score > this.hScore) {
                  Data.hScore = this.score
                  localStorage.setItem('hScore', this.score.toString())
                }
              }
            })
            this.add.existing(newBlock2)
            this.aliveBlocks.push(newBlock2)
            newBlock2.body.setCollisionGroup(this.blocksCollisionGroup)
            newBlock2.body.collides([this.blocksCollisionGroup, this.ballsCollisionGroup])
            break
          case 3:
            let newBlock3 = new Triangle(this.game, dx * (np - 1) + 50 + adjustX, this.game.height, this.ballsCollisionGroup)
            newBlock3.signal.addOnce(() => {
              console.log('GAME OVER')
              if (this.gameState) {
                this.gameState = false
                this.state.start('Over')
                Data.score = this.score
                localStorage.setItem('score', Data.score.toString())
                if (this.score > this.hScore) {
                  Data.hScore = this.score
                  localStorage.setItem('hScore', this.score.toString())
                }
              }
            })
            this.add.existing(newBlock3)
            this.aliveBlocks.push(newBlock3)
            newBlock3.body.setCollisionGroup(this.blocksCollisionGroup)
            newBlock3.body.collides([this.blocksCollisionGroup, this.ballsCollisionGroup])
            break
          case 4:
            let newBlock4 = new Pentagon(this.game, dx * (np - 1) + 50 + adjustX, this.game.height, this.ballsCollisionGroup)
            newBlock4.signal.addOnce(() => {
              console.log('GAME OVER')
              if (this.gameState) {
                this.gameState = false
                this.state.start('Over')
                Data.score = this.score
                localStorage.setItem('score', Data.score.toString())
                if (this.score > this.hScore) {
                  Data.hScore = this.score
                  localStorage.setItem('hScore', this.score.toString())
                }
              }
            })
            this.add.existing(newBlock4)
            this.aliveBlocks.push(newBlock4)
            newBlock4.body.setCollisionGroup(this.blocksCollisionGroup)
            newBlock4.body.collides([this.blocksCollisionGroup, this.ballsCollisionGroup])
            break
        }
      }
    }
    for (let i = 0; i < this.aliveBlocks.length; i++) {
      this.aliveBlocks[i].body.y -= dy
    }
  }

  addABall () {
    let car = new Ball(this.game, this.game.width / 2, 50)
    car.body.mass = 10
    this.add.existing(car)
    this.balls.push(car)
    car.body.setCollisionGroup(this.ballsCollisionGroup)
    car.body.collides([this.blocksCollisionGroup, this.ballsCollisionGroup, this.lineCollisionGroup])
    car.body.createGroupCallback(
      this.blocksCollisionGroup,
      (myBody, otherBody) => {
        this.score++
        this.scoreText.text = this.score
        otherBody.sprite.decScore()
        if (otherBody.sprite.score < 1) {
          this.deadBlocks.push(otherBody.sprite)
          // otherBody.sprite.score = 20
          let index = this.aliveBlocks.indexOf(otherBody.sprite)
          this.aliveBlocks.splice(index, 1)
        }
      },
      this
    )
  }
}