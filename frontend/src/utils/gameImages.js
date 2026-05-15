const byTitle = {
    "Snake":         "/images/snake.png",
    "2048":          "/images/2048.png",
    "Breakout":      "/images/Breakout.png",
    "Memory Match":  "/images/memory match.png",
    "Tic-Tac-Toe":  "/images/tic-tac-toe.png",
    "Flappy Bird":   "/images/bird flying.png",
    "Minesweeper":   "/images/Minesweeper.png",
    "Platformer":    "/images/Plateformer.png",
    "Tetris":        "/images/Tetris.png",
    "Space Invaders":"/images/space invaders.png",
    "Pong":          "/images/Pong.png",
    "Whack-a-Mole":  "/images/whack a mole.png",
    "Connect Four":  "/images/Connect Four.png",
    "Simon Says":    "/images/Simon says.png",
    "Asteroids":     "/images/Asteroids.png",
    "Bubble Shooter":"/images/Bubble Shooter.png",
};

export function getGameImage(game) {
    return byTitle[game.title] ?? null;
}
