package com.jee.project.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "games")
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private String price;

    @Column(length = 2000)
    private String description;

    @Column
    private String emoji;

    @Column
    private boolean free = false;

    @Column(length = 500)
    private String imageUrl;

    @Column
    private String externalId;

    @Column(length = 500)
    private String gameUrl;

    @Column
    private String platform;
}
