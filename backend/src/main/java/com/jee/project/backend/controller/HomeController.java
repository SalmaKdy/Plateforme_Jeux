package com.jee.project.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class HomeController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Backend OK";
    }
}