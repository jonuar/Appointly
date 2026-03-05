package com.appointments.backend.repository;

import com.appointments.backend.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByAvailableDateGreaterThanEqual(LocalDate date);
}
