import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }
    preload()
    {
        this.load.image('tiles', 'tiles/tf_jungle_tileset.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json')

        this.load.atlas('Zuko', 'character/Zuko.png', 'character/Zuko.json')
        this.load.atlas('shroom', 'enemy/shroom.png', 'enemy/shroom.json')
        this.load.atlas('boss', 'boss/boss.png', 'boss/boss.json')

        this.load.image('empty-heart', 'healthimg/emptyheart-png.png')
        this.load.image('full-heart', 'healthimg/heart.png')

        this.load.image('ability', 'abilities/ability.png')
    }
    
    create()
    {
        this.scene.start('game')
    }
}