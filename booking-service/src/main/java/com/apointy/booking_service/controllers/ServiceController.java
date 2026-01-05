package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.ServiceRepository;
import com.apointy.booking_service.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PostMapping
    public ResponseEntity<?> createService(@RequestBody ServiceDto serviceDto,@RequestHeader("X-User-Id") Long userId) {
        Service service = serviceService.createService(serviceDto, userId);
        return ResponseEntity.ok("Ok");
    }
}
