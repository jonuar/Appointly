package com.appointments.backend.repository;

import com.appointments.backend.model.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long>{
    
}
