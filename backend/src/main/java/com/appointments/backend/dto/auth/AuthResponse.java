package com.appointments.backend.dto.auth;

import com.appointments.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    
    private String token;           // JWT token
    private String email;           // Para mostrar en UI
    private String name;            // Para personalización
    private Role role;              // Para mostrar contenido según rol
    private Long userId;            // Para futuras operaciones
    
}