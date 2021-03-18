import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import Ui from './scenes/Ui'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 900,
	height: 450,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			// debug: true
		}
	},
	scene: [Preloader, Game, Ui],
	scale: {
		zoom: 2
	}
})
