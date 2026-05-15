package com.jee.project.backend.controller;

import com.jee.project.backend.entity.Game;
import com.jee.project.backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HomeController {

    private final GameService gameService;

    public HomeController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/")
    public String home() {
        return "Backend is running";
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Backend OK";
    }

    @GetMapping("/api/games")
    public ResponseEntity<List<Game>> getPublicGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/api/games/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Game game = gameService.getGameById(id);
        if (game == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(game);
    }
}