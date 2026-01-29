package com.apointy.booking_service.repositories;

import com.apointy.booking_service.models.BusinessHoliday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessHolidayRepository extends JpaRepository<BusinessHoliday, Long> {
    List<BusinessHoliday> findByServiceId(Long serviceId);
}
