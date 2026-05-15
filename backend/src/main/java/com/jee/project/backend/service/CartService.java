package com.jee.project.backend.service;

import com.jee.project.backend.entity.CartItem;
import com.jee.project.backend.entity.Game;
import com.jee.project.backend.entity.User;
import com.jee.project.backend.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;

    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> getCartItemsByUser(User user) {
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(User user, Game game) {
        Optional<CartItem> existing = cartItemRepository.findByUserAndGame_Id(user, game.getId());
        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + 1);
            return cartItemRepository.save(item);
        }
        CartItem item = new CartItem();
        item.setUser(user);
        item.setGame(game);
        item.setQuantity(1);
        return cartItemRepository.save(item);
    }

    @Transactional
    public void removeFromCart(User user, Long gameId) {
        cartItemRepository.findByUserAndGame_Id(user, gameId)
            .ifPresent(item -> cartItemRepository.deleteById(item.getId()));
    }

    @Transactional
    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }

    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
}
