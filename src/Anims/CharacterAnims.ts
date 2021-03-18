import Phaser from 'phaser'

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => 
{
        anims.create({
            key: 'Zuko-idle-down',
            frames: [{ key: 'Zuko', frame: '_down idle 01.png' }]
        })

        anims.create({
            key: 'Zuko-walk-down',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 4, prefix: '_down walk 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-walk-up',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_up walk 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-walk-right',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_side walk right 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-walk-left',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_side walk left 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-attack-right',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_side attack right 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-attack-left',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_side attack left 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-attack-up',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_up attack 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-attack-down',
            frames: anims.generateFrameNames('Zuko', { start: 1, end: 8, prefix: '_down attack 0', suffix: '.png'}),
            repeat: -1,
            frameRate: 5
        })

        anims.create({
            key: 'Zuko-death',
            frames: [{ key: 'Zuko', frame: '_up walk 02.png' }]
        })




}
export {
    createCharacterAnims
}