package com.jee.project.backend.config;

import com.jee.project.backend.entity.Game;
import com.jee.project.backend.entity.User;
import com.jee.project.backend.repository.CartItemRepository;
import com.jee.project.backend.repository.GameRepository;
import com.jee.project.backend.repository.PurchaseRepository;
import com.jee.project.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final GameRepository gameRepository;
    private final CartItemRepository cartItemRepository;
    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(GameRepository gameRepository,
                      CartItemRepository cartItemRepository,
                      PurchaseRepository purchaseRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.gameRepository = gameRepository;
        this.cartItemRepository = cartItemRepository;
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create admin account once if it does not exist
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@gamehub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("[DataLoader] Admin account created: admin@gamehub.com / admin123 — CHANGE THIS PASSWORD IN PRODUCTION");
        }

        List<Game> existing = gameRepository.findAll();
        boolean needsReseed = existing.isEmpty()
            || existing.size() < 16
            || existing.stream().noneMatch(g -> g.getGameUrl() != null && g.getGameUrl().startsWith("/games/"))
            || existing.stream().anyMatch(g -> g.getImageUrl() == null);

        if (!needsReseed) return;

        System.out.println("[DataLoader] Seeding local HTML5 games...");
        cartItemRepository.deleteAll();
        purchaseRepository.deleteAll();
        gameRepository.deleteAll();

        Object[][] games = {
            // title, genre, description, price, gameUrl, emoji, imageUrl
            // --- Batch 1 (original 8) ---
            {"Snake",          "Arcade",    "Guidez le serpent pour manger les pommes sans vous mordre la queue !",   "9.99",  "/games/snake.html",         "🐍", "/images/snake.png"},
            {"2048",           "Puzzle",    "Glissez les tuiles pour combiner les chiffres et atteindre 2048 !",      "4.99",  "/games/2048.html",          "🔢", "/images/2048.png"},
            {"Breakout",       "Arcade",    "Cassez toutes les briques avec la balle et la raquette.",                "7.99",  "/games/breakout.html",      "🧱", "/images/Breakout.png"},
            {"Memory Match",   "Puzzle",    "Retournez les cartes et trouvez toutes les paires cachees.",             "3.99",  "/games/memory.html",        "🃏", "/images/memory match.png"},
            {"Tic-Tac-Toe",    "Strategie", "Affrontez une IA dans ce classique strategique imparable.",             "0.99",  "/games/tictactoe.html",     "⭕", "/images/tic-tac-toe.png"},
            {"Flappy Bird",    "Arcade",    "Evitez les tuyaux et battez votre record personnel !",                   "5.99",  "/games/flappy.html",        "🐦", "/images/bird flying.png"},
            {"Minesweeper",    "Puzzle",    "Desamorcez toutes les mines sans jamais en declencher une seule.",       "3.99",  "/games/minesweeper.html",   "💣", "/images/Minesweeper.png"},
            {"Platformer",     "Action",    "Courez, sautez et collectez des pieces dans ce platformer retro.",       "8.99",  "/games/platformer.html",    "🏃", "/images/Plateformer.png"},
            // --- Batch 2 (new 8) ---
            {"Tetris",         "Arcade",    "Empilez les tetrominos et effacez un maximum de lignes !",               "12.99", "/games/tetris.html",        "🧩", "/images/Tetris.png"},
            {"Space Invaders", "Arcade",    "Defendez la Terre contre des vagues d aliens de plus en plus rapides.",  "9.99",  "/games/spaceinvaders.html", "👾", "/images/space invaders.png"},
            {"Pong",           "Sport",     "Affrontez l IA dans le classique du tennis de table electronique.",      "2.99",  "/games/pong.html",          "🏓", "/images/Pong.png"},
            {"Whack-a-Mole",   "Arcade",    "Tapez sur les taupes le plus vite possible avant la fin du temps !",    "4.99",  "/games/whackamole.html",    "🔨", "/images/whack a mole.png"},
            {"Connect Four",   "Strategie", "Alignez 4 jetons avant l IA dans ce duel strategique.",                 "3.99",  "/games/connectfour.html",   "🔴", "/images/Connect Four.png"},
            {"Simon Says",     "Memoire",   "Memorisez et repetez la sequence de couleurs qui s allonge a chaque tour.", "4.99", "/games/simon.html",      "🟢", "/images/Simon says.png"},
            {"Asteroids",      "Arcade",    "Pilotez votre vaisseau et detruisez tous les asteroides de la galaxie.", "11.99", "/games/asteroids.html",    "☄️", "/images/Asteroids.png"},
            {"Bubble Shooter", "Casual",    "Visez et tirez pour faire eclater des groupes de bulles colorees.",      "6.99",  "/games/bubbleshooter.html", "🫧", "/images/Bubble Shooter.png"},
        };

        for (Object[] g : games) {
            Game game = new Game();
            game.setTitle((String) g[0]);
            game.setGenre((String) g[1]);
            game.setDescription((String) g[2]);
            game.setPrice((String) g[3]);
            game.setGameUrl((String) g[4]);
            game.setEmoji((String) g[5]);
            game.setImageUrl((String) g[6]);
            game.setPlatform("Web Browser");
            game.setFree(false);
            gameRepository.save(game);
        }

        System.out.println("[DataLoader] Seeded " + games.length + " local HTML5 games.");
    }
}
