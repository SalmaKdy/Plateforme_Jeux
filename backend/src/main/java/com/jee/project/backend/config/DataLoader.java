package com.jee.project.backend.config;

import com.jee.project.backend.entity.Game;
import com.jee.project.backend.repository.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final GameRepository gameRepository;

    public DataLoader(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (gameRepository.count() == 0) {
            Game game1 = new Game();
            game1.setTitle("Cyber Odyssey");
            game1.setGenre("Action / RPG");
            game1.setPrice("49.99€");
            game1.setDescription("Un RPG cyberpunk immersif dans un monde ouvert futuriste.");
            game1.setEmoji("🎮");
            gameRepository.save(game1);

            Game game2 = new Game();
            game2.setTitle("Shadow Realms");
            game2.setGenre("FPS / Horror");
            game2.setPrice("34.99€");
            game2.setDescription("Un FPS horrifique dans des ruines mystérieuses.");
            game2.setEmoji("👁️");
            gameRepository.save(game2);

            Game game3 = new Game();
            game3.setTitle("Neon Racer X");
            game3.setGenre("Racing");
            game3.setPrice("29.99€");
            game3.setDescription("Courses à grande vitesse dans des circuits néon.");
            game3.setEmoji("🏎️");
            gameRepository.save(game3);

            Game game4 = new Game();
            game4.setTitle("Vortex Wars");
            game4.setGenre("Strategy");
            game4.setPrice("39.99€");
            game4.setDescription("Domination tactique sur plusieurs factions.");
            game4.setEmoji("⚔️");
            gameRepository.save(game4);

            Game game5 = new Game();
            game5.setTitle("Quantum Breach");
            game5.setGenre("Stealth");
            game5.setPrice("44.99€");
            game5.setDescription("Infiltration et espionnage dans un futur dystopique.");
            game5.setEmoji("🔦");
            gameRepository.save(game5);

            Game game6 = new Game();
            game6.setTitle("Arena Legends");
            game6.setGenre("Battle Royale");
            game6.setPrice("Free");
            game6.setDescription("100 joueurs, une seule survie.");
            game6.setEmoji("🏆");
            game6.setFree(true);
            gameRepository.save(game6);

            Game game7 = new Game();
            game7.setTitle("Starfall Protocol");
            game7.setGenre("Sci-Fi / RPG");
            game7.setPrice("54.99€");
            game7.setDescription("Explorez la galaxie et forgez votre destin.");
            game7.setEmoji("🚀");
            gameRepository.save(game7);

            Game game8 = new Game();
            game8.setTitle("Iron Citadel");
            game8.setGenre("Tower Defense");
            game8.setPrice("19.99€");
            game8.setDescription("Défendez votre forteresse contre des vagues ennemies.");
            game8.setEmoji("🏰");
            gameRepository.save(game8);
        }
    }
}
