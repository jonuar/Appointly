package com.appointments.backend.config;

import com.appointments.backend.model.Role;
import com.appointments.backend.model.User;
import com.appointments.backend.repository.ServiceItemRepository;
import com.appointments.backend.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {

    private final ServiceItemRepository serviceItemRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            ServiceItemRepository serviceItemRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.serviceItemRepository = serviceItemRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        // Inicializar Usuarios de prueba
        if (userRepository.count() == 0) {
            User testUser = User.builder()
                    .name("Usuario Prueba")
                    .email("test@example.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.USER)
                    .build();

            User adminUser = User.builder()
                    .name("Administrador")
                    .email("admin@appointly.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();

            userRepository.saveAll(List.of(testUser, adminUser));
            System.out.println("✅ DataInitializer: Usuarios de prueba cargados.");
        }

        // Inicializar Servicios
        if (serviceItemRepository.count() == 0) {
            List<ServiceItem> services = List.of(
                new ServiceItem(null, "Corte de cabello", "Corte clásico o moderno con lavado incluido", 25.0, 45, true),
                new ServiceItem(null, "Masaje relajante", "Masaje corporal completo con aceites esenciales", 60.0, 60, true),
                new ServiceItem(null, "Manicura", "Limpieza y esmaltado de uñas con diseño básico", 20.0, 40, true),
                new ServiceItem(null, "Pedicura", "Tratamiento completo de pies con hidratación", 25.0, 50, true),
                new ServiceItem(null, "Limpieza facial", "Tratamiento de limpieza profunda con mascarilla", 45.0, 60, true),
                new ServiceItem(null, "Tinte de cabello", "Coloración completa con productos premium", 80.0, 90, true),
                new ServiceItem(null, "Depilación con cera", "Depilación en zonas específicas con cera natural", 30.0, 30, true),
                new ServiceItem(null, "Consulta nutricional", "Asesoría personalizada de alimentación y hábitos", 50.0, 45, true)
            );
            serviceItemRepository.saveAll(services);
            System.out.println("✅ DataInitializer: " + services.size() + " servicios de ejemplo cargados.");
        }
    }
}
