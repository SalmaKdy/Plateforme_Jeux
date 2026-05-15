package com.jee.project.backend.service;

import com.jee.project.backend.dto.ChangePasswordRequest;
import com.jee.project.backend.dto.UserAdminDto;
import com.jee.project.backend.entity.User;
import com.jee.project.backend.repository.CartItemRepository;
import com.jee.project.backend.repository.PurchaseRepository;
import com.jee.project.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final PurchaseRepository purchaseRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(UserRepository userRepository,
                        CartItemRepository cartItemRepository,
                        PurchaseRepository purchaseRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.purchaseRepository = purchaseRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserAdminDto> listUsers() {
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public UserAdminDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        return toDto(user);
    }

    public UserAdminDto updateUserRole(Long id, String role) {
        if (!"USER".equals(role) && !"ADMIN".equals(role)) {
            throw new RuntimeException("Rôle invalide. Valeurs acceptées : USER, ADMIN");
        }
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        user.setRole(role);
        userRepository.save(user);
        return toDto(user);
    }

    @Transactional
    public void deleteUser(Long id, String currentUsername) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        if (user.getUsername().equals(currentUsername)) {
            throw new RuntimeException("Vous ne pouvez pas supprimer votre propre compte");
        }
        cartItemRepository.deleteByUser(user);
        purchaseRepository.deleteAll(purchaseRepository.findByUser(user));
        userRepository.delete(user);
    }

    public UserAdminDto getAdminProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        return toDto(user);
    }

    public UserAdminDto updateAdminProfile(String username, String newUsername, String newEmail) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        if (newUsername != null && !newUsername.isBlank() && !newUsername.equals(username)) {
            if (userRepository.existsByUsername(newUsername)) {
                throw new RuntimeException("Ce nom d'utilisateur est déjà pris");
            }
            user.setUsername(newUsername);
        }
        if (newEmail != null && !newEmail.isBlank()) {
            user.setEmail(newEmail);
        }
        userRepository.save(user);
        return toDto(user);
    }

    public void changeAdminPassword(String username, ChangePasswordRequest request) {
        if (request.getCurrentPassword() == null || request.getCurrentPassword().isBlank()) {
            throw new RuntimeException("Le mot de passe actuel est requis");
        }
        if (request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            throw new RuntimeException("Le nouveau mot de passe est requis");
        }
        if (request.getNewPassword().length() < 6) {
            throw new RuntimeException("Le nouveau mot de passe doit contenir au moins 6 caractères");
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Les mots de passe ne correspondent pas");
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Le mot de passe actuel est incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public Map<String, Long> getAdminStats() {
        List<User> all = userRepository.findAll();
        long total = all.size();
        long admins = all.stream().filter(u -> "ADMIN".equals(u.getRole())).count();
        long normalUsers = total - admins;
        return Map.of("totalUsers", total, "admins", admins, "normalUsers", normalUsers);
    }

    private UserAdminDto toDto(User user) {
        return new UserAdminDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}
