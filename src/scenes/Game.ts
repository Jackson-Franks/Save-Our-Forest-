import Phaser from 'phaser'


import { createCharacterAnims } from '../anims/CharacterAnims'
import { createShroomanims } from '../anims/EnemyAnims'

import Shroom from '../enemies/Shroom'
import '../characters/Zuko'
import Zuko from '../characters/Zuko'
import Boss from '../enemies/Boss'

import { sceneEvents } from '../events/EventCenter'
import { createBossAnims } from '~/Anims/BossAnims'

export default class Game extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private Zuko!: Zuko

    private abilities!: Phaser.Physics.Arcade.Group
    private shrooms!: Phaser.Physics.Arcade.Group

    private boss!: Phaser.Physics.Arcade.Group

    private playerShroomsCollider?: Phaser.Physics.Arcade.Collider
    private playerBossCollider?: Phaser.Physics.Arcade.Collider
    private hit = 0

	constructor()
	{
		super('game')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        this.scene.run('game-ui')

        createCharacterAnims(this.anims)
        createShroomanims(this.anims)
        createBossAnims(this.anims)

        const map = this.make.tilemap({ key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')
        

        map.createStaticLayer('Ground', tileset)
        const wallsLayer = map.createStaticLayer('Trees/Walls', tileset)

        this.abilities = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image
        })

        wallsLayer.setCollisionByProperty({ colides: true })
        

        // const debugGraphics = this.add.graphics().setAlpha(0.7)
        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })

        this.Zuko = this.add.Zuko(6000, 520, 'Zuko')
        this.Zuko.setAbilites(this.abilities)
  
        this.cameras.main.startFollow(this.Zuko, true)

        this.shrooms = this.physics.add.group({
            classType: Shroom,
            createCallback: (go) => {
                const shroomGo = go as Shroom
                shroomGo.body.onCollide = true
            }
            
            
        })

        this.boss = this.physics.add.group({
            classType: Boss,
            createCallback: (go) => {
                const bossGo = go as Boss
                bossGo.body.onCollide = true
            }
            
            
        })

        
            
            
        
        
        this.boss.create(6000, 500, 'boss')

        this.shrooms.create(550, 600, 'shroom').setSize(20, 35).setOffset(665, 63) 
        
        
        this.physics.add.collider(this.shrooms, wallsLayer)
        this.physics.add.collider(this.Zuko, wallsLayer)
        this.physics.add.collider(this.boss, wallsLayer)

        this.physics.add.collider(this.abilities, wallsLayer)
        this.physics.add.collider(this.abilities, this.shrooms, this.handleAbilityShroomCollision, undefined, this)
        this.physics.add.collider(this.abilities, this.boss, this.handleAbilityBossCollision, undefined, this)

        this.playerShroomsCollider = this.physics.add.collider(this.shrooms, this.Zuko, this.handlePlayerShroomCollision, undefined, this)
        this.playerBossCollider = this.physics.add.collider(this.boss, this.Zuko, this.handlePlayerBossCollision, undefined, this)
        
    }
    private handleAbilityShroomCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        this.abilities.killAndHide(obj1)
        this.shrooms.killAndHide(obj2)
    }

    private handleAbilityBossCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        this.abilities.killAndHide(obj1)
        this.boss.killAndHide(obj2)
    }

    private handlePlayerShroomCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        
        const shroom = obj2 as Shroom

        const dx = this.Zuko.x - shroom.x
        const dy = this.Zuko.y - shroom.y

        const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(100)

        this.Zuko.handleDamage(dir)

        sceneEvents.emit('player-damage', this.Zuko.health)

        if (this.Zuko.health <= 0)
        {
            this.playerShroomsCollider?.destroy()
        }
        
        this.Zuko.setVelocity(dir.x, dir.y)

        this.hit = 1
    }

    private handlePlayerBossCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        
        const boss = obj2 as Boss

        const dx = boss.x + this.Zuko.x
        const dy = boss.y + this.Zuko.y

        const dir = new Phaser.Math.Vector2(dy, dx).normalize().scale(100)

        this.Zuko.handleDamage(dir)

        sceneEvents.emit('player-damage', this.Zuko.health)

        if (this.Zuko.health <= 0)
        {
            this.playerBossCollider?.destroy()
        }
        
        this.Zuko.setVelocity(dir.x, dir.y)

        this.hit = 1
    }

    update(t: number, dt:number)
    {
        if(this.hit > 0)
        {
            ++this.hit
            if (this.hit > 10){
                this.hit = 0
            }
            return
        }
        if(this.Zuko)
        {
            this.Zuko.update(this.cursors)
        }
    }
}
