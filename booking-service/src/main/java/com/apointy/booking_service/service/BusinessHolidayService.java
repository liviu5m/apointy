package com.apointy.booking_service.service;

import com.apointy.booking_service.dtos.BusinessHolidayDto;
import com.apointy.booking_service.models.BusinessHoliday;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.BusinessHolidayRepository;

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

//    public BusinessHoliday createBusinessHoliday() {}
}
