package com.appointments.backend.controller;

import com.appointments.backend.model.User;
import com.appointments.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public User create(@RequestBody User user) {
        // Encriptar password
        return repository.save(user);
    }

    @GetMapping
    public List<User> getAll() {
        return repository.findAll();
    }
}