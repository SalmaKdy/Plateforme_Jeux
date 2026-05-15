package com.jee.project.backend.service;

import com.jee.project.backend.entity.CartItem;
import com.jee.project.backend.entity.Purchase;
import com.jee.project.backend.entity.User;
import com.jee.project.backend.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public List<Purchase> getPurchasesByUser(User user) {
        return purchaseRepository.findByUser(user);
    }

    public Purchase savePurchase(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    public void purchaseCartItems(User user, List<CartItem> cartItems) {
        String today = LocalDate.now().toString();
        for (CartItem item : cartItems) {
            if (!purchaseRepository.existsByUserAndGame(user, item.getGame())) {
                Purchase purchase = new Purchase();
                purchase.setUser(user);
                purchase.setGame(item.getGame());
                purchase.setPurchaseDate(today);
                purchaseRepository.save(purchase);
            }
        }
    }
}
