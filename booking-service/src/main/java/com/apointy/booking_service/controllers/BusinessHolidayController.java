package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.BusinessHolidayDto;
import com.apointy.booking_service.models.BusinessHoliday;
import com.apointy.booking_service.service.BusinessHolidayService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business-holiday")
public class BusinessHolidayController {
    private final BusinessHolidayService businessHolidayService;

    public BusinessHolidayController(BusinessHolidayService businessHolidayService) {
        this.businessHolidayService = businessHolidayService;
    }

    @PostMapping
    public ResponseEntity<?> createBusinessHoliday(@Valid @RequestBody BusinessHolidayDto businessHolidayDto) {
        BusinessHoliday businessHoliday = businessHolidayService.createHoliday(businessHolidayDto);
        return ResponseEntity.ok(businessHoliday);
    }

    @GetMapping
    public ResponseEntity<?> getBusinessHoliday(@RequestParam Long serviceId) {
        List<BusinessHoliday> businessHolidays = businessHolidayService.findByServiceId(serviceId);
        return ResponseEntity.ok(businessHolidays);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBusinessHoliday(@PathVariable Long id, @Valid @RequestBody BusinessHolidayDto businessHolidayDto) {
        BusinessHoliday businessHoliday = businessHolidayService.updateBusinessHoliday(businessHolidayDto, id);
        return ResponseEntity.ok(businessHoliday);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> updateBusinessHoliday(@PathVariable Long id) {
        businessHolidayService.deleteBusinessHoliday(id);
        return ResponseEntity.ok("Successfully deleted holiday");
    }

}
