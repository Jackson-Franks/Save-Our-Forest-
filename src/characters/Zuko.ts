import { Vector } from 'matter'
import Phaser from 'phaser'


declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            Zuko(x: number, y: number, texture: string, frame?: number | string): Zuko
        }
    }
}

enum HealthState
{
    IDLE,
    DAMAGE,
    DEAD
}

export default class Zuko extends Phaser.Physics.Arcade.Sprite
{
    private healthState = HealthState.IDLE
    private damageTime = 0

    private _health = 3

    private abilites?: Phaser.Physics.Arcade.Group

    get health()
    {
        return this._health
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | string)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('Zuko-walk-right')
    }

    setAbilites(abilites: Phaser.Physics.Arcade.Group)
    {
        this.abilites = abilites
    }

    handleDamage(dir: Phaser.Math.Vector2)
    {
        if (this._health <= 0)
        {
            return
        }

        if (this.healthState === HealthState.DAMAGE)
        {
            return
        }

        --this._health

        if(this._health <= 0)
        {
            this.healthState = HealthState.DEAD
			this.anims.play('Zuko-death')
			this.setVelocity(0, 0)

        }
        else {
            this.setVelocity(dir.x, dir.y)

            this.setTint(0xff0000)
    
            this.healthState = HealthState.DAMAGE
            this.damageTime = 0
        }
    }

    private useAbility()
    {
        if (!this.abilites)
        {
            return
        }
        const ability = this.abilites.get(this.x-125, this.y-30, 'ability') as Phaser.Physics.Arcade.Image
        if (!ability)
        {
            return
        }

        const parts = this.anims.currentAnim.key.split('-')
        const direction = parts[2]

        const vec = new Phaser.Math.Vector2(0, 0)

        switch (direction)
        {
            case 'up':
                vec.y = -1
                break
            case 'down':
                vec.y = 1
                break

            default:
            case 'right':
                vec.x = 1
                break

            case 'left':
                vec.x = -1
                break
        }
        const angle = vec.angle()
        
        ability.setActive(true)
        ability.setVisible(true)

        ability.setSize(20, 30)
        

        ability.setRotation(angle)

        

        ability.setVelocity(vec.x * 300, vec.y * 300)
    }

    preUpdate(t: number, dt: number)
    {
        super.preUpdate(t, dt)

        switch (this.healthState)
        {
            case HealthState.IDLE:
                break

            case HealthState.DAMAGE:
                this.damageTime += dt
                if (this.damageTime >= 250)
                {
                    this.healthState = HealthState.IDLE
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }

    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        if (this.healthState === HealthState.DAMAGE
			|| this.healthState === HealthState.DEAD
		)
		{
			return
        }
        
        if(!cursors)
        {
            return
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.space!))
        {
            this.useAbility()
            return
        }
        
        const speed = 100
        
        const leftDown = cursors.left?.isDown
		const rightDown = cursors.right?.isDown
		const upDown = cursors.up?.isDown
		const downDown = cursors.down?.isDown


        if (leftDown)
        {
            this.anims.play('Zuko-walk-left', true)
            this.setVelocity(-speed, 0)
        }
        else if (rightDown)
        {
            this.anims.play('Zuko-walk-right', true)
            this.setVelocity(speed, 0)
        }
        else if (upDown)
        {
            this.anims.play('Zuko-walk-up', true)
            this.setVelocity(0, -speed)
        }
        else if (downDown)
        {
            this.anims.play('Zuko-walk-down', true)
            this.setVelocity(0, speed)
        }
        else{
            this.play('Zuko-walk-right')
            this.setVelocity(0, 0)
        }

    }

}
Phaser.GameObjects.GameObjectFactory.register('Zuko', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texure: string, frame?: string | number){
    var sprite = new Zuko(this.scene, x, y, texure, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    sprite.body.setSize(sprite.width = 17, sprite.height = 32)
    sprite.body.offset.y = 18
    sprite.body.offset.x = -2.5

    return sprite
})