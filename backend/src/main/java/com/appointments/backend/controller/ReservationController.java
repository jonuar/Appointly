package com.appointments.backend.controller;

import com.appointments.backend.model.Reservation;
import com.appointments.backend.model.ServiceItem;
import com.appointments.backend.model.User;
import com.appointments.backend.repository.ReservationRepository;
import com.appointments.backend.repository.UserRepository;
import com.appointments.backend.repository.ServiceItemRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;

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

    @GetMapping("/my")
    public List<Reservation> getMyReservations(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return repository.findByUser_Id(user.getId());
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation, Authentication authentication) {
        User user = (User) authentication.getPrincipal(); // Get user from token
        
        ServiceItem service = serviceItemRepository.findById(reservation.getService().getId())
            .orElseThrow(() -> new RuntimeException("Service not found"));
            
        reservation.setUser(user);
        reservation.setService(service);
        return repository.save(reservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Reservation reservation = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
            
        if (!reservation.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("No tienes permiso para cancelar esta reserva");
        }
        
        repository.delete(reservation);
        return ResponseEntity.ok().build();
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
