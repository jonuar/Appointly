package com.appointments.backend.config;

import com.appointments.backend.model.ServiceItem;
import com.appointments.backend.repository.ServiceItemRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {

    private final ServiceItemRepository serviceItemRepository;

    public DataInitializer(ServiceItemRepository serviceItemRepository) {
        this.serviceItemRepository = serviceItemRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
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
        } else {
            System.out.println("ℹ️  DataInitializer: Ya existen servicios en la base de datos, omitiendo carga inicial.");
        }
    }
}
