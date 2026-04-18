package com.jee.project.backend.repository;

import com.jee.project.backend.entity.Purchase;
import com.jee.project.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByUser(User user);
}
