package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.ServiceRepository;
import com.apointy.booking_service.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<?> getAllServicesByUserId(@RequestHeader("X-User-Id") Long userId) {
        List<Service> services = serviceService.getAllServiceByUserId(userId);
        return ResponseEntity.ok(services);
    }

    @PostMapping
    public ResponseEntity<?> createService(@Valid @RequestBody ServiceDto serviceDto, @RequestHeader("X-User-Id") Long userId) {
        Service service = serviceService.createService(serviceDto, userId);
        return ResponseEntity.ok(service);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@Valid @RequestBody ServiceDto serviceDto, @PathVariable Long id) {
        Service service = serviceService.updateService(serviceDto, id);
        return ResponseEntity.ok(service);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok("Service deleted successfully");
    }
}
