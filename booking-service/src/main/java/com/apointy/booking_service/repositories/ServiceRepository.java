package com.apointy.booking_service.repositories;

import com.apointy.booking_service.models.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service,Long> {

}
