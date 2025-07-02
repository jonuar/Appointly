
package com.appointments.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity, not recommended for production
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/**").permitAll() // Permitir explícitamente endpoints de usuarios
                .anyRequest().permitAll() // Allow all requests for simplicity
            );

        return http.build();
    }
};


