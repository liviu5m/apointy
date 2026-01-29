package com.apointy.booking_service.service;

import com.apointy.booking_service.dtos.BusinessHolidayDto;
import com.apointy.booking_service.models.BusinessHoliday;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.BusinessHolidayRepository;
import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class BusinessHolidayService {

    private final BusinessHolidayRepository businessHolidayRepository;
    private final ServiceService serviceService;

    public BusinessHolidayService(BusinessHolidayRepository businessHolidayRepository, ServiceService serviceService) {
        this.businessHolidayRepository = businessHolidayRepository;
        this.serviceService = serviceService;
    }

    public BusinessHoliday createHoliday(BusinessHolidayDto businessHolidayDto) {
        Service service = serviceService.getServiceById(businessHolidayDto.getServiceId());
        BusinessHoliday businessHoliday = new BusinessHoliday(
                service,
                businessHolidayDto.getReason(),
                businessHolidayDto.getType(),
                businessHolidayDto.getDate(),
                businessHolidayDto.getStartTime(),
                businessHolidayDto.getEndTime(),
                businessHolidayDto.getDaysRecurring()
        );
        return businessHolidayRepository.save(businessHoliday);
    }

    public List<BusinessHoliday> findByServiceId(Long serviceId) {
        List<BusinessHoliday> businessHolidays = businessHolidayRepository.findByServiceId(serviceId);
        return businessHolidays;
    }


    public BusinessHoliday updateBusinessHoliday(@Valid BusinessHolidayDto businessHolidayDto, Long id) {
        BusinessHoliday businessHoliday = businessHolidayRepository.findById(id).orElseThrow(() -> new RuntimeException("Holiday not found"));
        businessHoliday.setReason(businessHolidayDto.getReason());
        businessHoliday.setType(businessHolidayDto.getType());
        businessHoliday.setDate(businessHolidayDto.getDate());
        businessHoliday.setStartTime(businessHolidayDto.getStartTime());
        businessHoliday.setEndTime(businessHolidayDto.getEndTime());
        businessHoliday.setDaysRecurring(businessHolidayDto.getDaysRecurring());
        return businessHolidayRepository.save(businessHoliday);
    }

    public void deleteBusinessHoliday(Long id) {
        businessHolidayRepository.deleteById(id);
    }
}
