package com.jee.project.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Backend is running";
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Backend OK";
    }
}