namespace SpriteKind {
    export const NPC = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile_demon-lantern`, function (sprite2, location2) {
    game.showLongText("DONT TOUCH THAT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", DialogLayout.Full)
    setcustomgameover = true
})
// Next_Level Event
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    if (setreal_round == 1) {
        setroundcontroller = 200
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
        tiles.setCurrentTilemap(tilemap`tile_arena`)
    }
    if (setroundcontroller == 2) {
        setroundcontroller = 202
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
        tiles.setCurrentTilemap(tilemap`tile_arena`)
    }
})
// If life =
info.onLifeZero(function () {
    setcustomgameover = true
})
// Cutscene trigger
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile_objective-story`, function (sprite22, location22) {
    // Cutscene Level-1
    if (setreal_round == 1) {
        if (setcutscenecontroller == true) {
            setcutscenecontroller = false
            story.startCutscene(function () {
                story.setSoundEnabled(true)
                tiles.setCurrentTilemap(tilemap`tile_level1-cutscene_over`)
                scene.cameraFollowSprite(sprNPCWalter)
                controller.moveSprite(sprPlayer, 0, 0)
                story.printDialog("Hello traveller.", 80, 90, 20, 150, 15, 1, story.TextSpeed.Fast)
                story.printDialog("Welcome to the Void", 80, 90, 20, 150, 15, 1, story.TextSpeed.Fast)
                story.printDialog("Im Walter", 80, 90, 20, 150, 15, 1, story.TextSpeed.Fast)
                story.printDialog("Follow the arrows to continue your journey", 80, 90, 20, 120, 15, 1, story.TextSpeed.Fast)
                scene.cameraFollowSprite(sprPlayer)
                controller.moveSprite(sprPlayer, 40, 40)
                sprNPCWalter.destroy(effects.coolRadial, 100)
                story.clearAllText()
            })
        }
    }
    if (setreal_round == 2) {
        if (setcutscenecontroller == true) {
            setcutscenecontroller = false
            story.startCutscene(function () {
                controller.moveSprite(sprPlayer, 0, 0)
                tiles.setCurrentTilemap(tilemap`level2-part1_opened`)
                story.printDialog("Hello Traveller", 120, 145, 100, 180, 15, 1, story.TextSpeed.Fast)
                story.printDialog("Welcome to the Temple of [Name]", 90, 145, 100, 170, 15, 1, story.TextSpeed.Fast)
                controller.moveSprite(sprPlayer, 40, 40)
            })
        }
    }
})
let sprNPCPriest: Sprite = null
let companion = ""
let sprPlayer: Sprite = null
let sprNPCWalter: Sprite = null
let setcutscenecontroller = false
let setreal_round = 0
let setcustomgameover = false
let setroundcontroller = 0
let setgood_start = 1
if (setgood_start == 1) {
    setgood_start = 0
    setroundcontroller = 200
} else {
    setgood_start = 0
    setroundcontroller = 0
}
// Special Features
forever(function () {
    if (setcustomgameover == true) {
        setcustomgameover = false
        story.clearAllText()
        story.cancelAllCutscenes()
        tiles.setCurrentTilemap(tilemap`tile_arena`)
        sprites.destroyAllSpritesOfKind(SpriteKind.Player)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
        game.showLongText("Game over", DialogLayout.Full)
        if (setreal_round == 2) {
            setroundcontroller = 200
        }
        if (setreal_round == 3) {
            setroundcontroller = 300
        }
    }
})
// Menu
forever(function () {
    // Development settings
    if (false) {
    	
    }
    if (setroundcontroller == 0) {
        scene.setBackgroundColor(0)
        setroundcontroller = 999
        story.showPlayerChoices("New Game", "Level selection", "Quit", "?")
        if (story.checkLastAnswer("New Game")) {
            setroundcontroller = 100
            setreal_round = 0
            companion = "none"
        }
        if (story.checkLastAnswer("Level selection")) {
            if (setreal_round == 0) {
                game.showLongText("No Games loaded ", DialogLayout.Full)
                game.reset()
            }
            if (setreal_round == 1) {
                story.showPlayerChoices("Level-1", "Quit")
                if (story.checkLastAnswer("Quit")) {
                    game.over(false)
                }
                if (story.checkLastAnswer("Level-1")) {
                    setroundcontroller = 100
                }
            }
            if (setreal_round == 2) {
                story.showPlayerChoices("Level-1", "Level-2", "Quit")
                if (story.checkLastAnswer("Level-1")) {
                    setroundcontroller = 100
                }
                if (story.checkLastAnswer("Level-2")) {
                    setroundcontroller = 200
                }
                if (story.checkLastAnswer("Quit")) {
                    game.over(false)
                }
            }
        }
        if (story.checkLastAnswer("Quit")) {
            game.over(false, effects.dissolve)
        }
        if (story.checkLastAnswer("?")) {
            tiles.setCurrentTilemap(tilemap`level4`)
            scene.setBackgroundColor(1)
            scene.setBackgroundImage(assets.image`easteregg_rüdiger`)
        }
    }
})
// Level-1
forever(function () {
    if (setroundcontroller == 100) {
        setreal_round = 1
        setroundcontroller = 1
        scene.setBackgroundColor(1)
        tiles.setCurrentTilemap(tilemap`level1`)
        sprPlayer = sprites.create(assets.image`player_ghost`, SpriteKind.Player)
        sprNPCWalter = sprites.create(assets.image`npc_walter`, SpriteKind.NPC)
        tiles.placeOnTile(sprPlayer, tiles.getTileLocation(1, 8))
        tiles.placeOnTile(sprNPCWalter, tiles.getTileLocation(10, 8))
        scene.cameraFollowSprite(sprPlayer)
        controller.moveSprite(sprPlayer, 30, 30)
        setcutscenecontroller = true
    }
})
// Level 2.1
forever(function () {
    if (setroundcontroller == 200) {
        setroundcontroller = 2
        setreal_round = 2
        sprPlayer = sprites.create(assets.image`player_ghost`, SpriteKind.Player)
        scene.setBackgroundColor(1)
        tiles.setCurrentTilemap(tilemap`level2-part1_closed`)
        tiles.placeOnRandomTile(sprPlayer, assets.tile`tile_spawn`)
        controller.moveSprite(sprPlayer, 45, 45)
        scene.cameraFollowSprite(sprPlayer)
        sprNPCPriest = sprites.create(assets.image`npc_priest`, SpriteKind.NPC)
        tiles.placeOnTile(sprNPCPriest, tiles.getTileLocation(7, 6))
        setcutscenecontroller = true
    }
})
// Level 2.2
forever(function () {
    if (setroundcontroller == 202) {
        setroundcontroller = 2.2
        setreal_round = 2
        sprPlayer = sprites.create(assets.image`player_ghost`, SpriteKind.Player)
        scene.setBackgroundColor(1)
        tiles.setCurrentTilemap(tilemap`level6`)
        tiles.placeOnRandomTile(sprPlayer, assets.tile`tile_spawn`)
        controller.moveSprite(sprPlayer, 45, 45)
        scene.cameraFollowSprite(sprPlayer)
    }
})
