package com.apointy.auth_service.controllers;

import com.apointy.auth_service.models.Business;
import com.apointy.auth_service.services.BusinessService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }

    @GetMapping
    private ResponseEntity<?> getBusiness(@RequestHeader("X-User-Id") Long userId) {
        Business business = businessService.getBusiness(userId);
        return ResponseEntity.ok(business);
    }
}
