package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.BusinessHolidayDto;
import com.apointy.booking_service.models.BusinessHoliday;
import com.apointy.booking_service.service.BusinessHolidayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/business-holiday")
public class BusinessHolidayController {
    private final BusinessHolidayService businessHolidayService;

    public BusinessHolidayController(BusinessHolidayService businessHolidayService) {
        this.businessHolidayService = businessHolidayService;
    }

    @PostMapping
    public ResponseEntity<?> createBusinessHoliday(@RequestBody BusinessHolidayDto businessHolidayDto) {
        BusinessHoliday businessHoliday = businessHolidayService.createHoliday(businessHolidayDto);
        return ResponseEntity.ok(businessHoliday);
    }

}
