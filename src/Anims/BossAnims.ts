import Phaser from 'phaser'

const createBossAnims = (anims: Phaser.Animations.AnimationManager) =>
{
    anims.create({
        key: 'boss-idle-down',
        frames: anims.generateFrameNames('boss', { start: 1, end: 8, prefix: 'wizard 0', suffix: '.png'}),
        repeat: -1,
        frameRate: 5
    })
}
export { createBossAnims }