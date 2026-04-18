package com.jee.project.backend.controller;

import com.jee.project.backend.entity.*;
import com.jee.project.backend.repository.UserRepository;
import com.jee.project.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserRepository userRepository;
    private final GameService gameService;
    private final PurchaseService purchaseService;
    private final CartService cartService;

    public DashboardController(UserRepository userRepository, GameService gameService, PurchaseService purchaseService, CartService cartService) {
        this.userRepository = userRepository;
        this.gameService = gameService;
        this.purchaseService = purchaseService;
        this.cartService = cartService;
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserData(@RequestParam String username, Authentication authentication) {
        if (!authentication.getName().equals(username)) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of(
            "username", user.getUsername(),
            "email", user.getEmail()
        ));
    }

    @GetMapping("/games")
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/purchased")
    public ResponseEntity<?> getPurchasedGames(@RequestParam String username, Authentication authentication) {
        if (!authentication.getName().equals(username)) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        List<Purchase> purchases = purchaseService.getPurchasesByUser(user);
        List<Game> games = purchases.stream().map(Purchase::getGame).toList();
        return ResponseEntity.ok(games);
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCartItems(@RequestParam String username, Authentication authentication) {
        if (!authentication.getName().equals(username)) {
            return ResponseEntity.status(403).body(Map.of("error", "Unauthorized"));
        }
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        List<CartItem> cartItems = cartService.getCartItemsByUser(user);
        return ResponseEntity.ok(cartItems);
    }
}
