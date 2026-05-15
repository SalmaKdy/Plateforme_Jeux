package com.jee.project.backend.repository;

import com.jee.project.backend.entity.CartItem;
import com.jee.project.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndGame_Id(User user, Long gameId);
    void deleteByUser(User user);
}
