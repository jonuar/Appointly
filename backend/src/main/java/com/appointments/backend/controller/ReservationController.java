package com.appointments.backend.controller;

import com.appointments.backend.model.Reservation;
import com.appointments.backend.model.ServiceItem;
import com.appointments.backend.model.User;
import com.appointments.backend.repository.ReservationRepository;
import com.appointments.backend.repository.UserRepository;
import com.appointments.backend.repository.ServiceItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationRepository repository;
    private final UserRepository userRepository;
    private final ServiceItemRepository serviceItemRepository;

    public ReservationController(
        ReservationRepository repository,
        UserRepository userRepository,
        ServiceItemRepository serviceItemRepository
        ) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.serviceItemRepository = serviceItemRepository;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        User user = userRepository.findById(reservation.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        ServiceItem service = serviceItemRepository.findById(reservation.getService().getId())
            .orElseThrow(() -> new RuntimeException("Service not found"));
        reservation.setUser(user);
        reservation.setService(service);
        return repository.save(reservation);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getByUser(@PathVariable Long userId) {
        return repository.findByUser_Id(userId);
    }
    
    @GetMapping("/service/{serviceId}")
    public List<Reservation> getByService(@PathVariable Long serviceId) {
        return repository.findByService_Id(serviceId);
    }
}
