package com.jee.project.backend.service;

import com.jee.project.backend.entity.Purchase;
import com.jee.project.backend.entity.User;
import com.jee.project.backend.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

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
}
