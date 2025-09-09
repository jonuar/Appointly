package com.appointments.backend.dto.reservation;

import com.appointments.backend.model.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationResponse {
    
    private Long id;
    private LocalDateTime reservationDateTime;
    private ReservationStatus status;
    private String notes;
    
    // User data
    private Long userId;
    private String userName;
    private String userEmail;
    
    // SERvice data
    private Long serviceId;
    private String serviceName;
    private Double servicePrice;
    private Integer serviceDurationInMinutes;
    
    // Metadata
    private LocalDateTime createdAt;
    private boolean canCancel; // Lógica cancelación reserva
}