SAVE OUR FOREST!

Help traveler! The evil wizard has been tormenting our land, killing our forest and turning the creatures that inhabit it into his minions!

Use the arrow keys to move around the forest to try and find the wizards temple.
Use the space bar plus the arrow key direction you want to use your ability.

You have three lives, getting hit by a creature or the boss will cause you to lose one.

This project was done in under a week with the use of Tiled, Typescript, and Phaser 3, all brand new languages to me.

I started by building out the map in tiled, making the trees walls and rocks being coliders.

Then I used a texture packer to import my character, Zuko, on to my project, which came in json and image form.

I then went through the functionality of the play, starting with the simple stuff like movement and animations of my character.

I then did the same thing with my enemies throughout the forest, and the boss.

Once I had all of the sprites moving I had to make them be collidable, allowing them to run into walls, eachother, and the character.

Once that was implemented, I was able to make my character shoot his ability, which will eleminate the enemy.

Then I just had to do the UI which is just a simple 3 heart system, where being touched by an enemy will cause you to bounce off of them, and lose one of your hearts.

Once all three of your hearts are gone you will not be able to move and will be considered dead.