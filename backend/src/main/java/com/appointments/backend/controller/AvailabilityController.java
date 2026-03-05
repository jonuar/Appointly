package com.appointments.backend.controller;

import com.appointments.backend.model.Availability;
import com.appointments.backend.repository.AvailabilityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    private final AvailabilityRepository repository;

    public AvailabilityController(AvailabilityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Availability> getAvailability() {
        return repository.findByAvailableDateGreaterThanEqual(LocalDate.now());
    }

    @PostMapping
    public Availability create(@RequestBody Availability availability) {
        return repository.save(availability);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
