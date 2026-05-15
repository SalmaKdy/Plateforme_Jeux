package com.jee.project.backend.controller;

import com.jee.project.backend.dto.ChangePasswordRequest;
import com.jee.project.backend.dto.UserAdminDto;
import com.jee.project.backend.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAdminDto>> getUsers() {
        return ResponseEntity.ok(adminService.listUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserAdminDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String role = body.get("role");
        if (role == null || role.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Le champ 'role' est requis"));
        }
        return ResponseEntity.ok(adminService.updateUserRole(id, role));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Principal principal) {
        adminService.deleteUser(id, principal.getName());
        return ResponseEntity.ok(Map.of("message", "Utilisateur supprimé avec succès"));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserAdminDto> getProfile(Principal principal) {
        return ResponseEntity.ok(adminService.getAdminProfile(principal.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Principal principal, @RequestBody Map<String, String> body) {
        String newUsername = body.get("username");
        String newEmail = body.get("email");
        UserAdminDto updated = adminService.updateAdminProfile(principal.getName(), newUsername, newEmail);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/profile/password")
    public ResponseEntity<?> changePassword(Principal principal, @RequestBody ChangePasswordRequest request) {
        adminService.changeAdminPassword(principal.getName(), request);
        return ResponseEntity.ok(Map.of("success", true, "message", "Mot de passe mis à jour avec succès"));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(adminService.getAdminStats());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleException(RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
}
