package com.appointments.backend.controller;

import com.appointments.backend.model.ServiceItem;
import com.appointments.backend.repository.ServiceItemRepository;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceItemController {

    private final ServiceItemRepository repository;

    public ServiceItemController(ServiceItemRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping
    public List<ServiceItem> getAllServices() {
        return repository.findAll();
    }

    @PostMapping
    public ServiceItem createService(@RequestBody ServiceItem item) {
        return repository.save(item);
    }
}
