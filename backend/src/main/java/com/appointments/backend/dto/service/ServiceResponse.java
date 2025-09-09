package com.appointments.backend.dto.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponse {
    
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer durationInMinutes;
    private boolean active;
    
    // Info adicional para frontend
    private long totalReservations;    
    private boolean isPopular;
    private String formattedPrice;     // "$50.00" ya formateado
    private String formattedDuration;  // "1h 30min" ya formateado
}