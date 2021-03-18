import Phaser from 'phaser'

const createShroomanims = (anims: Phaser.Animations.AnimationManager) =>
{
    anims.create({
        key: 'shroom-run',
        frames: anims.generateFrameNames('shroom', {start:1, end:4, prefix: 'mushroom run 0', suffix: '.png'}),
        repeat: -1,
        frameRate: 7
    })

    
}

export {
    createShroomanims
}