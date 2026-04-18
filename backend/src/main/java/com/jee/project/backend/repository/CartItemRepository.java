package com.jee.project.backend.repository;

import com.jee.project.backend.entity.CartItem;
import com.jee.project.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
}
