package com.apointy.booking_service.controllers;

import com.apointy.booking_service.dtos.PriceDto;
import com.apointy.booking_service.dtos.ServiceDto;
import com.apointy.booking_service.enums.ServiceDuration;
import com.apointy.booking_service.models.Service;
import com.apointy.booking_service.repositories.ServiceRepository;
import com.apointy.booking_service.responses.ServiceResponse;
import com.apointy.booking_service.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<?> getAllServices(@RequestParam(required = false) String name,
                                            @RequestParam(required = false) Long categoryId,
                                            @RequestParam(required = false) ServiceDuration duration,
                                            @RequestParam(required = false) Double minPrice,
                                            @RequestParam(required = false) Double maxPrice,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        Page<ServiceResponse> services = serviceService.getAllServices(name, categoryId, duration, minPrice, maxPrice, page, size);
        return ResponseEntity.ok(services);
    }

    @GetMapping("/price")
    public ResponseEntity<?> getPriceRangeServices() {
        Object[] prices = serviceService.getMaxMinPriceServices();
        return ResponseEntity.ok(prices);
    }

    @GetMapping("/user-id")
    public ResponseEntity<?> getAllServicesByUserId(@RequestHeader("X-User-Id") Long userId) {
        List<ServiceResponse> services = serviceService.getAllServiceByUserId(userId);
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
