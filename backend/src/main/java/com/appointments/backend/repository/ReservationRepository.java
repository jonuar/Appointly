package com.appointments.backend.repository;

import com.appointments.backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser_Id(Long userId);
    List<Reservation> findByService_Id(Long serviceId);
}
